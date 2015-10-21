<?php

class ImageEditor {
	/**
	 * @var bool Flag whether errors occured
	 */
	public $error=false;

	/**
	 * @var array Array of errors occured
	 */
	public $errors=array();

	/**
	 * @var bool Whether image was properly loaded and ready for editing
	 */
	public $ready=false;

	/**
	 * @var array Image background(RGB)
	 */
	public $background=array(255,255,255);

	/**
	 * @var resource Image resource
	 */
	private $__image;

	/**
	 * @var string Loaded image filepath
	 */
	private $__path='';

	/**
	 * @param null $filename Optional filepath to load image from
	 */
	public function __construct($filename=null) {
		if ($filename!==null) $this->load($filename);
	}//__construct

	/**
	 * If errors in work occured, will log with $this::__log()
	 */
	public function __destruct() {
		if ($this->__image) imagedestroy($this->__image);

		if ($this->error && sizeof($this->errors)) {
			$this->__log('Image errors:<br>'.join('<br>',$this->errors));
		}
	}//__destruct

	/**
	 * Returns background color identifier of image
	 *
	 * @param bool|resource $image Image to take values from. Default is self
	 *
	 * @return bool|int
	 */
	public function background($image=false){
		if (!$image && !$this->ready) return false;

		return imagecolorallocate($image?$image:$this->__image,$this->background[0],$this->background[1],$this->background[2]);
	}

	/**
	 * Loads image from file
	 *
	 * @param string $filename Image filename
	 *
	 * @return bool
	 */
	public function load($filename) {
		$ii = @getimagesize($filename);
		if (!$ii) {
			$this->error = true;
			$this->errors[]='File read error ('.$filename.')';
			$this->ready = false;
			return false;
		}

		$this->__path = $filename;
		$this->ready = true;

		switch($ii[2]) {
			case IMAGETYPE_JPEG:
				if ($this->__image) imagedestroy($this->__image);
				$this->__image = imagecreatefromjpeg($filename);
				break;

			case IMAGETYPE_GIF:
				if ($this->__image) imagedestroy($this->__image);
				$this->__image = imagecreatefromgif($filename);
				break;

			case IMAGETYPE_PNG:
				if ($this->__image) imagedestroy($this->__image);
				$this->__image = imagecreatefrompng($filename);
				break;

			default:
				$this->error=true;
				$this->errors[]='Unknown image type ('.($ii[2]).')';
				$this->ready = false;
				return false;
				break;
		}
		
		//imagefill($this->__image,0,0,$this->background());

		return true;
	}//load


	/**
	 * Saves images source to file
	 *
	 * @param string $filename Filename path
	 * @param int $tp Image type (Can be IMAGETYPE_JPEG, IMAGETYPE_GIF, IMAGETYPE_PNG). If null, will be set according to $filename extension
	 * @param null $permissions [Optional] Image file permissions (CHMOD). Default is not set (No CHMOD performed)
	 * @param int $compression Compression ratio for JPEG images. Default is 100 (Max)
	 * @return bool
	 */
	public function save($filename='', $tp=null, $compression=100, $permissions=null) {
		if (!$this->ready) return false;

		if (!$filename) $filename = $this->__path;

		if ($tp===null) {
			switch(pathinfo($filename,PATHINFO_EXTENSION)) {
				case 'gif':
					$tp = IMAGETYPE_GIF;
					break;

				case 'png':
					$tp = IMAGETYPE_PNG;
					break;

				default:
					$tp = IMAGETYPE_JPEG;
					break;
			}
		}

		switch($tp) {
			case IMAGETYPE_JPEG:
				imagejpeg($this->__image,$filename,$compression);
				break;

			case IMAGETYPE_GIF:
				imagegif($this->__image,$filename);
				break;

			case IMAGETYPE_PNG:
				imagepng($this->__image,$filename);
				break;
		}

		if( $permissions !== null) {
			chmod($filename,$permissions);
		}

		return true;
	}//save


	/**
	 * Outputs image source to browser
	 *
	 * @param int $tp Image type (Can be IMAGETYPE_JPEG, IMAGETYPE_GIF, IMAGETYPE_PNG)
	 *
	 * @return bool
	 */
	public function output($tp=IMAGETYPE_JPEG) {
		if (!$this->ready) return false;

		if( $tp === IMAGETYPE_JPEG ) {
			imagejpeg($this->__image,null,100);
		} elseif( $tp === IMAGETYPE_GIF ) {
			imagegif($this->__image);
		} elseif( $tp === IMAGETYPE_PNG ) {
			imagepng($this->__image);
		} else return false;

		return true;
	}//output

	/**
	 * Returns current image width
	 *
	 * @return int|bool
	 */
	public function getWidth() {
		return $this->ready?imagesx($this->__image):false;
	}//getWidth

	/**
	 * Returns current image height
	 *
	 * @return int|bool
	 */
	public function getHeight() {
		return $this->ready?imagesy($this->__image):false;
	}//getHeight

	/**
	 * Resizes image to new height (Width will be automatically scaled)
	 *
	 * @param int $height New image height
	 *
	 * @return bool
	 */
	public function resizeToHeight($height) {
		if (!$this->ready) return false;

		$curHeight = $this->getHeight();

		return $height!=$curHeight?$this->resizeStrict($this->getWidth() * ($height / $curHeight),$height):true;
	}//resizeToHeight

	/**
	 * Resizes image to new width (Height will be automatically scaled)
	 *
	 * @param int $width New image width
	 *
	 * @return bool
	 */
	public function resizeToWidth($width) {
		if (!$this->ready) return false;

		$curWidth = $this->getWidth();

		return $width!=$curWidth?$this->resizeStrict($width,$this->getheight() * ($width / $curWidth)):true;
	}//resizeToWidth

	/**
	 * Scales image to new size
	 *
	 * @param float $scale Scale ration (In percents, 100 will make no effect, 50 will resize to 0.5 size)
	 *
	 * @return bool
	 */
	public function scale($scale) {
		return $this->resizeStrict($this->getWidth() * $scale,$this->getheight() * $scale);
	}//scale

	/**
	 * Crops an image. New image is frame from ($left,$top) to ($left+$width,$top+$height).
	 *
	 * @param float $left New image left start
	 * @param float $top New image top start
	 * @param float $width New width
	 * @param float $height New height
	 * @param bool $percent Flag whether arguments are percents of image size (Or pixels). Default is false (Pixels)
	 *
	 * @return bool True on success, false otherwise
	 */
	public function crop($left,$top,$width,$height,$percent=false) {
		if (!$this->ready) return false;

		$w = $this->getWidth();
		$h = $this->getHeight();

		if ($percent) {
			$top = $h*$top/100;
			$height = $h*$height/100;

			$left = $w*$left/100;
			$width = $w*$width/100;
		}

		if (
			$left<0 || $left>$w
			|| $top<0 || $top>$h
			|| $width<0 || $width>$w
			|| $height<0 || $height>$h
			|| $left+$width>$w
			|| $top+$height>$h
			|| $left+$width===0
			|| $top+$height===0
		) return false;

		$new_image = imagecreatetruecolor($width, $height);
		imagecopyresampled($new_image, $this->__image, 0, 0, 0+$left, 0+$top, $width, $height, $width, $height);
		imagedestroy($this->__image);
		$this->__image = $new_image;

		return true;
	}//crop

	/**
	 * Makes an image frame. Similar to crop(), but right border is taken from original right border ($width-$right-$left)
	 * and bottom border - from original bottom border ($height-$bottom-$top).
	 *
	 * In other words, result is same as crop($left,$top,$this->getWidth()-$right-$left,$this->getHeight()-$bottom-$top)
	 *
	 * @param float $top Vertical border start
	 * @param float $right Horizontal border end (From right border)
	 * @param float $bottom Vertical border end (From bottom border)
	 * @param float $left Horizontal border start
	 * @param bool $percent Flag whether arguments are percents of image size (Or pixels). Default is false (Pixels)
	 *
	 * @return bool True on success, false otherwise
	 */
	public function frame($top,$right,$bottom,$left,$percent=false) {
		return $this->ready
			?$this->crop(
				$left,
				$top,
				$percent
					?($w=$this->getWidth())-$left*$w/100-$right*$w/100
					:$this->getWidth()-$left-$right,
				$percent
					?($h=$this->getHeight())-$top*$h/100-$bottom*$h/100
					:$this->getHeight()-$top-$bottom
			)
			:false;
	}//frame

	/**
	 * Resizes image with saving constraints.
	 * If new size are other constrains - image size changes with cutting.
	 * If $fitInside is true - no cutting is performed, background added instead and images fits in new dimensions.
	 *
	 * @param int $width New image width
	 * @param int $height New image height
	 * @param bool $fitInside Whether to fit ALL image inside new dimension (Without blank stripes). Default is false (Without blank stripes, with cutting)
	 * @param bool $return Whether to return crop values in percents without actual resizing. Default is false (Image resize will be done)
	 *
	 * @return Array|bool
	 */
	public function resize($width,$height,$fitInside=false,$return=false) {
		//TODO: fix $return calculation
		if (!$this->ready) return false;

		$curWidth = $this->getWidth();
		$curHeight = $this->getHeight();

		if ($width==$curWidth && $height==$curHeight) return (
			$return
				?array(
					'left' => 0,
					'top' => 0,
					'width' => 100,
					'height' => 100,
				)
				:true
		);

		$ratio = array($width*1.0 / $curWidth,$height*1.0 / $curHeight);

		if ($ratio[0]!==$ratio[1]) {
			if (!$fitInside) {
				if ($ratio[0]>$ratio[1]) {
					$this->resizeToWidth($width);

					$newHeight = $this->getHeight();

					$cut = ($newHeight-$height)/2.0;

					if ($return) return array(
						'left' => 0,
						'top' => $cut/$newHeight*100,
						'width' => 100,
						'height' => $cut*2/$newHeight*100,
					);

					$this->frame($cut,0,$cut,0);
				}
				else {
					$this->resizeToHeight($height);

					$newWidth = $this->getWidth();

					$cut = ($newWidth-$width)/2.0;

					if ($return) return array(
						'left' => $cut/$newWidth*100,
						'top' => 0,
						'width' => $cut*2/$newWidth*100,
						'height' => 100,
					);

					$this->frame(0,$cut,0,$cut);
				}
			} else {//fitInside
				if ($ratio[0]>$ratio[1]) {//wide picture
					if ($return) {
						$dstX = $curWidth*$ratio[1];
						$nWidth = $curWidth*$ratio[0];

						return array(
							'left' => -$dstX/$nWidth*50,
							'top' => 0,
							'width' => ($nWidth+$dstX)/$nWidth*100,
							'height' => 100,
						);
					}

					$this->resizeToHeight($height);

					$nWidth = $this->getWidth();
					$nHeight= $this->getHeight();

					$dstX = abs($nWidth-$width)/2;
					$dstY = 0;
				} else {//tall picture
					if ($return) {
						$dstY = $curHeight*$ratio[0];
						$nHeight = $curHeight*$ratio[1];

						return array(
							'left' => 0,
							'top' => -$dstY/$nHeight*50,
							'width' => 100,
							'height' => ($nHeight+$dstY)/$nHeight*100,
						);
					}

					$this->resizeToWidth($width);

					$nWidth = $this->getWidth();
					$nHeight= $this->getHeight();

					$dstY = abs($nHeight-$height)/2;
					$dstX = 0;
				}

				$ni = imagecreatetruecolor($width, $height);

				imagefill($ni,0,0,$this->background($ni));
				imagefill($this->__image,0,0,$this->background());
				
				imagecopyresampled(
					$ni,						//dst_img
					$this->__image,				//src_img
					$dstX,$dstY,				//dst_x/y
					0,0,						//src_x/y
					$nWidth,$nHeight,			//dst_w/h
					$nWidth,$nHeight			//src_w/h
				);

				//imagefill($ni,0,0,$this->background($ni));
				imagedestroy($this->__image);
				$this->__image = $ni;
			}
		}
		else {
			if ($return) return array(
				'left' => 0,
				'top' => 0,
				'width' => 100,
				'height' => 100,
			);

			$this->resizeStrict($width,$height);
		}

		return true;
	}//resize

	/**
	 * Resize WITHOUT keeping ratio (Image deformation possible)
	 *
	 * @param int $width New image width in pixels
	 * @param int $height New image height in pixels
	 *
	 * @return bool
	 */
	public function resizeStrict($width,$height) {
		if (!$this->ready) return false;

		$curWidth = $this->getWidth();
		$curHeight = $this->getHeight();

		if ($width==$curWidth && $height==$curHeight) return true;

		$ni = imagecreatetruecolor($width, $height);
		imagefill($ni,0,0,$this->background($ni));
		imagecopyresampled($ni, $this->__image, 0, 0, 0, 0, $width, $height, $curWidth, $curHeight);
		imagedestroy($this->__image);
		$this->__image = $ni;

		return true;
	}//resizeStrict

	/**
	 * Rotates image clockwise
	 *
	 * @param int $angle Angle in degrees
	 *
	 * @return bool
	 */
	public function rotate($angle) {
		if (!$this->ready) return false;

		$image = imagerotate($this->__image,-$angle,imagecolorallocatealpha($this->__image, $this->background[0], $this->background[1], $this->background[2],0));

		if (!$image) return false;

		imagedestroy($this->__image);

		$this->__image = $image;

		return true;
	}

	/**
	 * Adds log with '[class.ImageEditor]' postfix using error_log()
	 *
	 * @param string $txt Log message
	 */
	private function __log($txt) {
		error_log ($txt.' [class.ImageEditor]');
	}
}//ImageEditor


// Скрипт для генерации миниатюрных изображений (превью)
// Разработчик - Цигвинцев Андрей
// Последние изменения: ноябрь 2012 г.
// http://image-resizer.ru

$DOCUMENT_ROOT = getenv("DOCUMENT_ROOT");
$REMOTE_ADDR = getenv('REMOTE_ADDR');
error_reporting(E_ALL^E_NOTICE);

$DobleResize   = 'no';

$CopyResampled = 'yes';

$LocalCache    = 'netcat_cache/';
// $CacheTime  = 24*7;

$AdminIP       = array();

$Directory     = $DOCUMENT_ROOT;

$Original      = 'yes';

$MaxSize       = 8;


/////////////////////////////////////////////////////////////////
//
//  Просьба - ниже код НЕ МЕНЯТЬ
//  или делать это умелыми руками на трезвую голову! :)
//

// Максимальная ширина И высота фото
$z=(int)$_GET{'z'};
if ($z>0 && $z<10) $z=10;
if ($z>2000) $z=2000;

// Минимальная ширина И высота фото
$m=(int)$_GET{'m'};
if ($m>0 && $m<10) $m=10;
if ($m>2000) $m=2000;

// Процент
$p=(int)$_GET{'p'};
if ($p>0 && $p<5) $p=5;
if ($p>95) $p=95;

// Максимальная ширина
$w=(int)$_GET{'w'};
if ($w>0 && $w<10) $w=10;
if ($w>2000) $w=2000;

// Максимальная высота
$h=(int)$_GET{'h'};
if ($h>0 && $h<10) $h=10;
if ($h>2000) $h=2000;

if ($p==0 && $z==0 && $m==0 && $w==0 && $h==0) $z=120;

// Оставить область в центре по горизонтали (отрезать лишнее)
$wr=(int)$_GET{'wr'};

// Оставить область в центре по вертикали (отрезать лишнее)
$hr=(int)$_GET{'hr'};

// Качество картинки
$q=(int)$_GET{'q'};
if ($q<10 || $q>100) $q=80;

$fitInside = isset($_GET['f']);

// Путь к файлу относительно корня сайта
$file=$_GET{'file'};
$file=str_replace('\\', '/', $file);

if (
	$file=='' ||
	preg_match('/\.\.|\/\//', $file) ||
	!preg_match('/^[-_!.\/a-zA-Z0-9]+$/', $file) ||
	!preg_match('/[a-zA-Z0-9]$/', $file) ||
	(preg_match('/\/$/', $Directory) && preg_match('/^\//', $file)) ||
	(!preg_match('/\/$/', $Directory) && !preg_match('/^\//', $file))
   ) {
	error_gif('Некорректное значение переменной file.');
}

$file_local=$Directory.$file;

$file_name=md5($file_local.'-'.$z.$m.'-'.$w.$wr.'-'.$h.$hr.'|'.$fitInside.'-'.$p.$q.$CopyResampled.$DobleResize);

$flag_ok=1;

// Есть ли в кэше?
if ($LocalCache && file_exists($LocalCache.$file_name)) {

	$flag=1;
	$ftime=@filemtime($LocalCache.$file_name);

	if (rand(0,20)==1 && $ftime) {
		// Файл есть в кеше.
		// Случайно 1 из 20 раз проверяем - есть ли оригинальный файл и не изменился ли он
		$orig_ftime=@filemtime($DOCUMENT_ROOT.$file);
		if (!$orig_ftime || $orig_ftime>$ftime) {
			// Оригинального файла нет или его дата свежее
			// Удаляем превью
			@unlink($LocalCache.$file_name);
			$flag=0;
		}
	}

	if ($flag) {
		// Файл есть в кэше. Показываем его как JPG (в кеше только JPG)
		header_img(2, @filesize($LocalCache.$file_name), $ftime, substr($file_name,0,20).'.jpg');
		if (function_exists('file_get_contents')) {
			echo file_get_contents($LocalCache.$file_name);
		} else {
			@readfile($LocalCache.$file_name);
		}

		// Чистим кэш от старых файлов (не каждый раз, а случайно)
		if (count($AdminIP)==0 && $CacheTime>0 && rand(0, $CacheTime/5+1)==1) {
			$d=opendir($LocalCache);
			while (($e=readdir($d))!=false) {
				if (!preg_match('/\./', $e)) {
					$ft=@filemtime($LocalCache.$e);
					if ($ft && $ft+3600*$CacheTime < time()) @unlink($LocalCache.$e);
				}
			}
			closedir($d);
		}
		exit;
	}

} else if (count($AdminIP) && !in_array($REMOTE_ADDR, $AdminIP)){
	// Превью не сгенерировано администратором
	$flag_ok=0;
}

if (!file_exists($file_local)) error_gif('Файл не найден.');

// Узнаём размеры и формат
$imSize=@GetImageSize($file_local);

if (!$imSize) error_gif('Необходимо указать файл в формате JPG, GIF или PNG.');

if ($imSize[0]*$imSize[1] > $MaxSize*1024000) {
	error_gif('Фото слишком большое. Максимальный размер - '.$MaxSize.' Мегапикселей.');
}

if ($flag_ok==0) error_gif('Извините, превью не сгенерировано администратором.');

$editor = new ImageEditor($file_local);

if (!$editor->ready) error_gif('Не удалось открыть файл.');

if (!$w) {
	$editor->resizeToHeight($h);
} elseif (!$h) {
	$editor->resizeToWidth($w);
} else {
	$editor->resize($w, $h, $fitInside);
}

ob_start();  // Чтобы далее узнать точный размер файла
$editor->output();
header_img(2, ob_get_length(), time(), substr($file_name,0,20).'.jpg');
ob_end_flush(); 

// Кэшируем
if ($LocalCache) $editor->save($LocalCache.$file_name, IMAGETYPE_JPEG, $q);

exit;

// Показываем картинку с текстом ошибки
function error_gif($t) {

	$vsize=46;

	$t1=substr($t, 0, 30);
	if ($t != $t1) {
		$t1=ereg_replace(' [^ ]*$', '', $t1);
		$t2=trim(substr($t, strlen($t1), 90));
		$vsize=64;
	}

	header('HTTP/1.1 404 Not Found');
	header_img(1);

	$coin = imagecreate (250, $vsize);

	$color2 = imagecolorallocate($coin, 255, 0, 0);
	$color3 = imagecolorallocate($coin, 255, 255, 255);
	$color4 = imagecolorallocate($coin, 0, 0, 0);

	imagefilledrectangle($coin, 1, 1, 248, $vsize-2, $color3);

	ImageTTFText($coin, 13, 0, 5, 19, $color2, 'default.ttf', 'Ошибка!');

	ImageTTFText($coin, 11, 0, 5, 37, $color4, 'default.ttf', $t1);
	if ($t2) ImageTTFText($coin, 11, 0, 5, 55, $color4, 'default.ttf', $t2);

	ImageGif ($coin); 
	ImageDestroy ($coin);
	exit;
}

function header_img($i, $size=0, $last_modified=0, $file_name='') {

	if ($file_name || $last_modified) {

		if ($last_modified) $last_modified=gmdate('D, d M Y H:i:s', $last_modified);

		if( !function_exists("apache_request_headers") ) {
			function apache_request_headers() {
				$arh = array();
				$rx_http = '/\AHTTP_/';
				foreach ($_SERVER AS $key => $val) {
					if ( preg_match($rx_http, $key) ) {
						$arh_key = preg_replace($rx_http, '', $key);
						$rx_matches = array();
						// do some nasty string manipulations to restore the original letter case
						// this should work in most cases
						$rx_matches = explode('_', $arh_key);
						if ( count($rx_matches) > 0 AND strlen($arh_key) > 2 ) {
							foreach ($rx_matches AS $ak_key => $ak_val) $rx_matches[$ak_key] = ucfirst($ak_val);
							$arh_key = implode('-', $rx_matches);
						}
						$arh[$arh_key] = $val;
					}
				}
			return( $arh );
			}
		}

		$request_headers = apache_request_headers();

		foreach ($request_headers AS $key=>$value) {
		    if ( preg_match("/^If-Modified-Since$/is", $key) ) {
				if ( strtotime($value)>=strtotime($last_modified) ) {
					header($_SERVER['SERVER_PROTOCOL']." 304 Not Modified");
					exit; 
				}
			}
		}
	}

	if ($i==1) {
		header ("Content-type: image/gif");
	} else if ($i==2) {
		header ("Content-type: image/jpeg");
	} else if ($i==3) {
		header ("Content-type: image/png");
	}
	if ($last_modified) header('Last-Modified: '.$last_modified.' GMT');
	header('Content-Transfer-Encoding: binary');
	if ($file_name) header('Content-Disposition: inline; filename="'.urldecode($file_name).'"');
	if ($size>0) {
		header('Content-Length: '.$size);
		header('Connection: close');
	}
}

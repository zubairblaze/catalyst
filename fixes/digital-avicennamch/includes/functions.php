<?php

function check_features_permissions($permissions, $fid)
{
	if (strpos($permissions, $fid) !== false) 
		{
			
		}
		else
		{
			session_destroy();
	
			$msg_type = "alert-success";
			$msg = "Logged out successfully";
			
			header("Location: index.php?msg=".urlencode($msg)."&msg_type=".urlencode($msg_type));
			exit;
		}

	
}



function generate_category($parent, $dash="", $page='')
{

        $has_childs = false;
		
        //this prevents printing 'ul' if we don't have subcategories for this category



        global $menu_array;
        global $dash_char;
        global $selected_cat_id;
        

        //use global array variable instead of a local variable to lower stack memory requierment



        foreach($menu_array as $key => $value)

        {

                if ($value['parent'] == $parent  || $page) 

                {       

                        //if this is the first child print '<ul>'                       

                        if ($has_childs === false)

                        {

                                //don't print '<ul>' multiple times                             

                                $has_childs = true;
								
                                $dash = $dash . $dash_char;

                        }
                         
                        if ($selected_cat_id == $value['id'])
                        {
                            $sel = "selected='selected'";
                        }
                        else
                        {
                            $sel = "";
                        }

                        echo '<option value="'.esc($value['id']).'" '.$sel.'>' . $dash . esc($value['name']) . '</option>';
                        generate_category($key, $dash); // This is the fix

                        //call function again to generate nested list for subcategories belonging to this category

                        //echo '</li>';

                }

        }

        if ($has_childs === true) { 
            //$dash = $dash . $dash_char;
            //echo '</ul>';
            }

}

function resolve_category_by_id($id)
{
	global $con;
	$stmt = mysqli_prepare($con, "SELECT name FROM services_categories WHERE id=? AND status = '1' LIMIT 1");
	mysqli_stmt_bind_param($stmt, "i", $id);
	mysqli_stmt_execute($stmt);
	$fresult = mysqli_stmt_get_result($stmt);

	if(mysqli_num_rows($fresult)>=1)
	{
		$rc = mysqli_fetch_array($fresult);
		mysqli_free_result($fresult);
		mysqli_stmt_close($stmt);
		return $rc["name"];
	}
	else
	{
		mysqli_free_result($fresult);
		mysqli_stmt_close($stmt);
		//invalid_url('Cannot resolve product_catagories from product_catagories id (14)');
		return "";
	}
}

function resolve_brand_name_by_id($id)
{
	global $con;
	$stmt = mysqli_prepare($con, "SELECT name FROM brands WHERE id=? AND status = '1' LIMIT 1");
	mysqli_stmt_bind_param($stmt, "i", $id);
	mysqli_stmt_execute($stmt);
	$fresult = mysqli_stmt_get_result($stmt);

	if(mysqli_num_rows($fresult)>=1)
	{
		$rc = mysqli_fetch_array($fresult);
		mysqli_free_result($fresult);
		mysqli_stmt_close($stmt);
		return $rc["name"];
	}
	else
	{
		mysqli_free_result($fresult);
		mysqli_stmt_close($stmt);
		return "";
	}
}

function rmdir_recursive($dir) 
{
	if (!is_dir($dir)) {
		return;
	}
    foreach(scandir($dir) as $file) 
	{
        if ('.' === $file || '..' === $file) continue;
        if (is_dir("$dir/$file")) rmdir_recursive("$dir/$file");
        else unlink("$dir/$file");
    }
    rmdir($dir);
}

//recursive function that prints menu items as a nested html unorderd list
// functions.php

//recursive function that prints menu items as a nested html unorderd list
function generate_menu($parent, $dash = "")
{
    $has_childs = false;
    global $menu_array;
    global $dash_char;
    global $selected_cat_id;

    foreach ($menu_array as $key => $value) {
        // Corrected condition: Only check for the parent relationship
        if ($value['parent'] == $parent) {
            if ($has_childs === false) {
                $has_childs = true;
                $dash = $dash . $dash_char;
            }

            if ($selected_cat_id == $value['id']) {
                $sel = "selected='selected'";
            } else {
                $sel = "";
            }

            echo '<option value="' . esc($value['id']) . '" ' . $sel . '>' . $dash . esc($value['name']) . '</option>';
            
            // Correct recursive call
            generate_menu($key, $dash);
        }
    }
}


//recursive function that prints menu items as a nested html unorderd list
function generate_site_map($parent)
{

        $has_childs = false;
		$label_code = array("label-important","label-warning","label-success","label-info","label");

        //this prevents printing 'ul' if we don't have subcategories for this category



        global $site_map_array;
        global $level_count;
        

        //use global array variable instead of a local variable to lower stack memory requierment



        foreach($site_map_array as $key => $value)

        {

                if ($value['parent'] == $parent) 

                {       

                        //if this is the first child print '<ul>'                       

                        if ($has_childs === false)

                        {

                                //don't print '<ul>' multiple times                             

                                $has_childs = true;
								$level_count++;
                                ?>
                                 <ul id="task_list_<?=esc($value["id"])?>" class="site-map-list">
                                <?php

                        }
                         
                       
						$f = 15;
                        $n = 1;
						
                         ?>
                         
                          <li id="page_<?=esc($value["id"])?>" style="padding:9px <?=((9+$f)*$n)?>px;">
                          
                          	<label class="head">
                                <i class="icon-chevron-right"></i>
                                <span class="label <?=$label_code[($level_count-1)]?>"> <?=esc($value["name"])?></span>
                            </label>
                            
                           
                            <div class="pull-right" >
                                
                                <a class="btn btn-mini" href="view_site_map_banners.php?site_map_id=<?=esc($value["id"])?>" title="Banners" data-rel="tooltip"><i class="icon-picture"></i></a>
                                 <?php
								if ($level_count > 1) 
								{ 
							?>
                                <a class="btn btn-mini" href="view_site_map_widgets.php?site_map_id=<?=esc($value["id"])?>" title="Widgets" data-rel="tooltip"><i class="icon-qrcode"></i></a>
                                <a class="btn btn-mini" href="view_site_map_custom_navs.php?site_map_id=<?=esc($value["id"])?>" title="Custom Navs" data-rel="tooltip"><i class="icon-list-alt"></i></a>
                                <?php
                                	}
								?>
                                &nbsp;&nbsp;&nbsp;
                                <a class="btn btn-info btn-mini" href="edit_site_map.php?site_map_id=<?=esc($value["id"])?>" title="Edit" data-rel="tooltip"><i class="icon-edit icon-white"></i></a>
                                <?php 
								if ($level_count > 1) 
								{ 
							?>
                                <a class="btn btn-danger btn-mini" href="delete_site_map.php?site_map_id=<?=esc($value["id"])?>" data-confirm="<?=esc($msg_delete ?? '')?>" title="Delete" data-rel="tooltip" ><i class="icon-trash icon-white"></i></a>
                                
                                <?php if ($value["status"] == 0) { ?>
                                <a class="btn btn-warning btn-mini" href="status_site_map.php?site_map_id=<?=esc($value["id"])?>" title="Status" data-rel="tooltip"><i class="icon-ban-circle icon-

white"></i></a> 
                                <?php } ?>
                                <?php if ($value["status"] == 1) { ?>
                                <a class="btn btn-warning btn-mini" href="status_site_map.php?site_map_id=<?=esc($value["id"])?>" title="Status" data-rel="tooltip"><i class="icon-ok-circle icon-

white"></i></a> 
                                <?php } ?>
                                <?php } ?>
                                
                            </div>
                            
							
                            
                            <script>
                            $(document).ready(function(){
                                $("#task_list_<?=esc($value["id"])?>").sortable({
                                    update: function(event, ui) {
                                        $.post("arrange_site_map.php", { type: "orderPages", pages: $('#task_list_<?=esc($value["id"])?>').sortable('serialize') } );
                                    }
                                });
                            });
                            </script>

						<?php
						
                        generate_site_map($key);
						
						
						
                        //call function again to generate nested list for subcategories belonging to this category
						?>
                         </li>
                        <?php

                }

        }

        if ($has_childs === true)
		{ 
			$level_count--;
		?>
			</ul>
        <?php
		}

}

function validate_image_upload($file) {
    // Basic image upload validation
    $allowed_types = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (isset($file['tmp_name']) && is_uploaded_file($file['tmp_name'])) {
        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        $mime = finfo_file($finfo, $file['tmp_name']);
        finfo_close($finfo);
        if (!in_array($mime, $allowed_types)) {
            die("Invalid image type.");
        }
    }
}

/*
 * ---------------------------------------------------------------------------
 * Image upload helpers
 * ---------------------------------------------------------------------------
 * The old upload code wrote the file name into the database whether or not the
 * resized file actually landed on disk, so a missing/unwritable upload folder
 * (or an image type GD could not read) produced a record that pointed at a file
 * that was never created - the admin screen then showed an empty box instead of
 * a thumbnail. These helpers resize with GD directly, create the destination
 * folder when needed, and only report success once the file exists on disk.
 */

// Turn a PHP $_FILES error code into something a human can act on.
function upload_error_message($error_code)
{
	switch ($error_code)
	{
		case UPLOAD_ERR_OK:
			return "";
		case UPLOAD_ERR_INI_SIZE:
			return "The file is larger than the server limit (upload_max_filesize = " . ini_get('upload_max_filesize') . ").";
		case UPLOAD_ERR_FORM_SIZE:
			return "The file is larger than the limit set by the form.";
		case UPLOAD_ERR_PARTIAL:
			return "The file was only partially uploaded, please try again.";
		case UPLOAD_ERR_NO_FILE:
			return "No file was selected.";
		case UPLOAD_ERR_NO_TMP_DIR:
			return "The server has no temporary folder configured for uploads.";
		case UPLOAD_ERR_CANT_WRITE:
			return "The server could not write the uploaded file to disk.";
		case UPLOAD_ERR_EXTENSION:
			return "A PHP extension stopped the upload.";
		default:
			return "Unknown upload error (code " . (int) $error_code . ").";
	}
}

// Make sure an upload folder exists and can be written to.
function ensure_upload_dir($dir, &$error = null)
{
	if (!is_dir($dir))
	{
		if (!@mkdir($dir, 0755, true) && !is_dir($dir))
		{
			$error = "Upload folder could not be created: " . $dir;
			return false;
		}
	}

	if (!is_writable($dir))
	{
		$error = "Upload folder is not writable: " . $dir;
		return false;
	}

	return true;
}

/*
 * Resize an uploaded image to $max_width and save it into $dest_dir.
 * Returns the saved file name on success, or "" on failure with $error set.
 * Images smaller than $max_width are saved at their original size (no upscaling).
 */
function save_resized_upload($file, $dest_dir, $max_width, $base_name, &$error = null)
{
	$error = "";

	if (!isset($file) || !is_array($file))
	{
		$error = "No file was posted.";
		return "";
	}

	if (!isset($file['error']) || $file['error'] !== UPLOAD_ERR_OK)
	{
		$error = upload_error_message(isset($file['error']) ? $file['error'] : -1);
		return "";
	}

	if (!is_uploaded_file($file['tmp_name']))
	{
		$error = "The posted file is not a valid upload.";
		return "";
	}

	return resize_image_file($file['tmp_name'], $dest_dir, $max_width, $base_name, $error);
}

/*
 * Resize any readable image file into $dest_dir/$base_name.<ext>.
 * Returns the saved file name, or "" with $error set.
 */
function resize_image_file($src_path, $dest_dir, $max_width, $base_name, &$error = null)
{
	$error = "";

	$info = @getimagesize($src_path);
	if ($info === false)
	{
		$error = "The uploaded file is not a readable image.";
		return "";
	}

	$src_w = (int) $info[0];
	$src_h = (int) $info[1];
	$type  = (int) $info[2];

	if ($src_w < 1 || $src_h < 1)
	{
		$error = "The uploaded image has no usable dimensions.";
		return "";
	}

	switch ($type)
	{
		case IMAGETYPE_JPEG:
			$ext = "jpg";
			$src = function_exists('imagecreatefromjpeg') ? @imagecreatefromjpeg($src_path) : false;
			break;
		case IMAGETYPE_PNG:
			$ext = "png";
			$src = function_exists('imagecreatefrompng') ? @imagecreatefrompng($src_path) : false;
			break;
		case IMAGETYPE_GIF:
			$ext = "gif";
			$src = function_exists('imagecreatefromgif') ? @imagecreatefromgif($src_path) : false;
			break;
		case IMAGETYPE_WEBP:
			$ext = "webp";
			$src = function_exists('imagecreatefromwebp') ? @imagecreatefromwebp($src_path) : false;
			break;
		default:
			$error = "Only JPG, PNG, GIF and WEBP images can be uploaded.";
			return "";
	}

	if (!$src)
	{
		$error = "This server's GD library could not read that image type (" . strtoupper($ext) . ").";
		return "";
	}

	if (!ensure_upload_dir($dest_dir, $error))
	{
		imagedestroy($src);
		return "";
	}

	// Never enlarge a small image, only shrink big ones.
	if ($src_w > $max_width)
	{
		$dst_w = (int) $max_width;
		$dst_h = (int) round($src_h * ($max_width / $src_w));
		if ($dst_h < 1) { $dst_h = 1; }
	}
	else
	{
		$dst_w = $src_w;
		$dst_h = $src_h;
	}

	$dst = imagecreatetruecolor($dst_w, $dst_h);

	if ($type == IMAGETYPE_PNG || $type == IMAGETYPE_GIF || $type == IMAGETYPE_WEBP)
	{
		imagealphablending($dst, false);
		imagesavealpha($dst, true);
		$transparent = imagecolorallocatealpha($dst, 255, 255, 255, 127);
		imagefilledrectangle($dst, 0, 0, $dst_w, $dst_h, $transparent);
	}

	imagecopyresampled($dst, $src, 0, 0, 0, 0, $dst_w, $dst_h, $src_w, $src_h);

	$file_name = $base_name . "." . $ext;
	$full_path = rtrim($dest_dir, "/") . "/" . $file_name;

	switch ($type)
	{
		case IMAGETYPE_JPEG:
			$saved = @imagejpeg($dst, $full_path, 85);
			break;
		case IMAGETYPE_PNG:
			$saved = @imagepng($dst, $full_path, 8);
			break;
		case IMAGETYPE_GIF:
			$saved = @imagegif($dst, $full_path);
			break;
		default:
			$saved = @imagewebp($dst, $full_path, 85);
			break;
	}

	imagedestroy($src);
	imagedestroy($dst);

	// The whole point of this helper: confirm the file is really on disk.
	if (!$saved || !file_exists($full_path) || filesize($full_path) < 1)
	{
		$error = "The image could not be written to " . $dest_dir . ".";
		@unlink($full_path);
		return "";
	}

	@chmod($full_path, 0644);

	return $file_name;
}

// Remove a previously saved upload, ignoring anything that is not a plain file name.
function delete_upload_file($dir, $file_name)
{
	$file_name = basename((string) $file_name);

	if ($file_name === "" || $file_name === "." || $file_name === "..")
	{
		return;
	}

	$full_path = rtrim($dir, "/") . "/" . $file_name;

	if (is_file($full_path))
	{
		@unlink($full_path);
	}
}

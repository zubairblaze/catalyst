<?php
/*
 * Diagnostic page for the services-categories image uploads.
 * Open it in the browser while logged in as admin:
 *     /admin/check_services_categories_uploads.php
 * It answers "was the image really uploaded, and if not, why".
 * Safe to delete once everything reports OK.
 */
	include("../conn/conn.php");
	check_session_admin();

	include("includes/functions.php");
	//////////////////////////Check Permission Start//////////////////////////////////////////
	$fid='*11,';
	check_features_permissions($_SESSION["users_features_id"], $fid);
	//////////////////////////Check Permission End//////////////////////////////////////////

	$dirs = array(
		"Image (w800)"     => "../updata/service_categories/w800",
		"Thumbnail (w100)" => "../updata/service_categories/w100"
	);
?>
<!DOCTYPE html>
<html class="no-js">
<head>
<title><?=$_SESSION["company_name"]?></title>
<?php include("css.php"); ?>
</head>
<body>
<div class="navbar navbar-fixed-top">
  <div class="navbar-inner">
    <?php include("nav_bar.php"); ?>
  </div>
</div>
<div class="container-fluid">
  <div class="row-fluid">
    <div class="span3" id="sidebar">
      <?php include("left_nav.php"); ?>
    </div>
    <div class="span9" id="content">
      <div class="row-fluid">
        <div class="block">
          <div class="navbar navbar-inner block-header">
            <div class="muted pull-left">
              <h4>Services Categories - Upload Check</h4>
            </div>
          </div>
          <div class="block-content collapse in">
            <div class="span12">

              <h4>1. PHP upload settings</h4>
              <table class="table table-bordered table-striped">
                <tr><td>file_uploads</td><td><?=ini_get('file_uploads') ? "On" : "<strong>Off - uploads are disabled on this server</strong>"?></td></tr>
                <tr><td>upload_max_filesize</td><td><?=esc(ini_get('upload_max_filesize'))?></td></tr>
                <tr><td>post_max_size</td><td><?=esc(ini_get('post_max_size'))?></td></tr>
                <tr><td>memory_limit</td><td><?=esc(ini_get('memory_limit'))?></td></tr>
                <tr><td>upload_tmp_dir</td><td><?=esc(ini_get('upload_tmp_dir') ? ini_get('upload_tmp_dir') : sys_get_temp_dir())?></td></tr>
              </table>

              <h4>2. GD image support</h4>
              <?php if (!function_exists('gd_info')) { ?>
              <div class="alert alert-danger">The GD extension is not installed - no image can be resized or saved.</div>
              <?php } else { ?>
              <table class="table table-bordered table-striped">
                <?php
                  $gd = gd_info();
                  $checks = array(
                    'JPG'  => function_exists('imagecreatefromjpeg'),
                    'PNG'  => function_exists('imagecreatefrompng'),
                    'GIF'  => function_exists('imagecreatefromgif'),
                    'WEBP' => function_exists('imagecreatefromwebp')
                  );
                  foreach ($checks as $label => $ok)
                  {
                    echo '<tr><td>'.$label.'</td><td>'.($ok ? "supported" : "<strong>not supported - do not upload ".$label." files</strong>").'</td></tr>';
                  }
                ?>
                <tr><td>GD version</td><td><?=esc(isset($gd['GD Version']) ? $gd['GD Version'] : 'unknown')?></td></tr>
              </table>
              <?php } ?>

              <h4>3. Upload folders</h4>
              <table class="table table-bordered table-striped">
                <tr><th>Folder</th><th>Path</th><th>Status</th><th>Files</th></tr>
                <?php
                foreach ($dirs as $label => $dir)
                {
                	$error = "";
                	$ok = ensure_upload_dir($dir, $error);
                	$count = $ok ? max(0, count(scandir($dir)) - 2) : 0;
                	echo '<tr>';
                	echo '<td>'.esc($label).'</td>';
                	echo '<td><code>'.esc(realpath($dir) ? realpath($dir) : $dir).'</code></td>';
                	echo '<td>'.($ok ? 'exists and is writable' : '<strong>'.esc($error).'</strong>').'</td>';
                	echo '<td>'.$count.'</td>';
                	echo '</tr>';
                }
                ?>
              </table>

              <h4>4. Records pointing at missing files</h4>
              <?php
                $missing = array();
                $result = mysqli_query($con, "SELECT id, name, image, thumbnail FROM services_categories ORDER BY id ASC");
                while ($row = mysqli_fetch_assoc($result))
                {
                	if ($row["image"] != "" && !is_file("../updata/service_categories/w800/".$row["image"]))
                	{
                		$missing[] = array($row["id"], $row["name"], "image", $row["image"]);
                	}
                	if ($row["thumbnail"] != "" && !is_file("../updata/service_categories/w100/".$row["thumbnail"]))
                	{
                		$missing[] = array($row["id"], $row["name"], "thumbnail", $row["thumbnail"]);
                	}
                }
                mysqli_free_result($result);
              ?>
              <?php if (count($missing) == 0) { ?>
              <div class="alert alert-success">Every image and thumbnail recorded in the database exists on disk.</div>
              <?php } else { ?>
              <div class="alert alert-danger">
                <?=count($missing)?> record(s) point at a file that is not on disk. These were saved before the upload fix - open each one and upload the picture again.
              </div>
              <table class="table table-bordered table-striped">
                <tr><th>ID</th><th>Category</th><th>Field</th><th>File name</th><th></th></tr>
                <?php foreach ($missing as $m) { ?>
                <tr>
                  <td><?=esc($m[0])?></td>
                  <td><?=esc($m[1])?></td>
                  <td><?=esc($m[2])?></td>
                  <td><?=esc($m[3])?></td>
                  <td><a class="btn btn-info btn-mini" href="edit_services_categories.php?id=<?=esc($m[0])?>"><i class="icon-edit icon-white"></i> Edit</a></td>
                </tr>
                <?php } ?>
              </table>
              <?php } ?>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <hr>
  <footer>
    <?php include("footer.php"); ?>
  </footer>
</div>
<?php include("js.php"); ?>
</body>
</html>

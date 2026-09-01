<?php
	include("../conn/conn.php");
    check_session_admin();

	include("includes/functions.php");
	//////////////////////////Check Permission Start//////////////////////////////////////////
	$fid='*11,';
	check_features_permissions($_SESSION["users_features_id"], $fid);
	//////////////////////////Check Permission End//////////////////////////////////////////


	if (isset($_REQUEST["msg_type"]) && $_REQUEST["msg_type"] != "")
	{
		$msg_type = esc($_REQUEST["msg_type"]);
		$msg = esc($_REQUEST["msg"]);
	}
	else
	{
		$msg_type = "";
		$msg = "";
	}

	// Retrieve posted data * start *

	$id = (int) $_REQUEST["id"];

	// retrieve posted data * end *

	$query_select = "SELECT * FROM services_categories WHERE id = '".$id."'";
	$result_select = mysqli_query($con, $query_select);
	$row_select = mysqli_fetch_array($result_select);
	mysqli_free_result($result_select);

	if (!$row_select)
	{
		$msg_type = "alert-danger";
		$msg = "Record not found.";
		header("Location: view_services_categories.php?msg=".urlencode($msg)."&msg_type=".urlencode($msg_type));
		exit;
	}

	// COMPILE ALL MENU ITEMS AND SUB MENU ITEMS * START * //

	$query_cat_pop = mysqli_query($con, "SELECT * FROM services_categories WHERE  status = '1' ORDER BY name ASC");

	while ( $row_cat_pop = mysqli_fetch_assoc($query_cat_pop) )

	{
			$menu_array[$row_cat_pop['id']] = array('id' => $row_cat_pop['id'],'name' => $row_cat_pop['name'],'parent' => $row_cat_pop['belong_to']);
	}

	// COMPILE ALL MENU ITEMS AND SUB SUB MENU ITEMS * END * //

?>
<!DOCTYPE html>
<html class="no-js">
<head>
<title>
<?=$_SESSION["company_name"]?>
</title>
<?php include("css.php"); ?>
</head>

<body>

<!-- NAV BAR * START * -->
<div class="navbar navbar-fixed-top">
  <div class="navbar-inner">
    <?php include("nav_bar.php"); ?>
  </div>
</div>
<!-- NAV BAR * END * -->

<!-- CONTAINER * START * -->
<div class="container-fluid">

  <!-- CONTAINER ROW * START * -->
  <div class="row-fluid">

    <!-- LEFT NAV * START * -->
    <div class="span3" id="sidebar">
      <?php include("left_nav.php"); ?>
    </div>
    <!-- LEFT NAV * END *  -->

    <!-- DATA * START * -->
    <div class="span9" id="content">
      <div class="row-fluid">
        <div class="block">
          <div class="navbar navbar-inner block-header">
            <div class="muted pull-left">
              <h4>Edit Services Category</h4>
            </div>
            <div class="pull-right"><a class="btn btn-primary" href="view_services_categories.php"> <i class="icon-list icon-white"></i> View</a> </div>
          </div>
          <div class="block-content collapse in">
            <div class="span12">
              <?php
				if (strlen($msg_type) > 0 )
				{
			?>
              <div class="alert <?=$msg_type?> alert-block"> <a class="close" data-dismiss="alert" href="#">&times;</a>
                <h4 class="alert-heading">System Message</h4>
                <?=$msg?>
              </div>
              <?php
				}
			?>
              <form class="form-horizontal" id="states" name="states" method="post" action="edit_services_categories_hdl.php" enctype="multipart/form-data">
<?php csrf_field(); ?>
                <div class="tabbable">
                  <!-- tab * start * -->

                  <ul class="nav nav-pills">
                    <li class="active"><a href="#pane1" data-toggle="tab">Category Details</a></li>
                    <li><a href="#pane4" data-toggle="tab">Photograph </a></li>
                  </ul>
                  <div class="tab-content">
                    <!-- tab panel data *start* -->

                    <div id="pane1" class="tab-pane active">
                      <!-- panel 1 data *start* -->
                      <h4>Category Details</h4>
                      <fieldset>

                       <div class="control-group success">
    <label class="control-label" for="txt_category">Belong To: </label>
    <div class="controls">
        <select class="input-xxlarge" id="txt_category" name="txt_category">
            <option value="">Select a services Category</option>
            <?php
            $selected_cat_id = $row_select["belong_to"]; 
            $dash_char = "&nbsp;&nbsp;&nbsp;&nbsp;";
            
            // Generate options for categories
            foreach($menu_array as $key => $value) {
                // Skip the current category to prevent self-selection
                if ($value['id'] != $id) {
                    $selected = ($selected_cat_id == $value['id']) ? 'selected="selected"' : '';
                    echo '<option value="'.$value['id'].'" '.$selected.'>'.$value['name'].'</option>';
                }
            }
            ?>
        </select>
    </div>
</div>


                        <div class="control-group">
                          <label class="control-label" for="txt_name">Category Name*: </label>
                          <div class="controls">
                            <input class="input-xxlarge" id="txt_name" name="txt_name" type="text" placeholder="Please Add your catgory Name Here"  value="<?=$row_select["name"]?>" required>
                          </div>
                        </div>

						<div class="control-group">
                          <label class="control-label" for="txt_seo_name">SEO Name: </label>
                          <div class="controls">
                            <input class="input-xxlarge" id="txt_seo_name" name="txt_seo_name" type="text"  value="<?=$row_select["seo_name"]?>">
                          </div>
                        </div>

						<div class="control-group">
                          <label class="control-label" for="txt_title">Title*: </label>
                          <div class="controls">
                            <input class="input-xxlarge" id="txt_title" name="txt_title" type="text" placeholder="Please Add your catgory Title Here"  value="<?=$row_select["title"]?>" required>
                          </div>
                        </div>

						<div class="control-group success">
                          <label class="control-label" for="txt_type">Type: </label>
                          <div class="controls">
                            <select class="input-xxlarge" id="txt_type" name="txt_type">
                             <option value="category-details" <?php if ($row_select["type"] == 'category-details') { echo("SELECTED"); } ?>>Category</option>
                             <option value="video-details" <?php if ($row_select["type"] == 'video-details') { echo("SELECTED"); } ?>>Videos</option>
								<option value="file-details" <?php if ($row_select["type"] == 'file-details') { echo("SELECTED"); } ?>>Files</option>
							</select>
                          </div>
                        </div>

                        <div class="control-group">
                          <label class="control-label" for="txt_name">Description: </label>
                          <div class="controls">
                            <textarea class="input-xxlarge texteditor" id="txt_description" name="txt_description"   ><?=$row_select["description"]?></textarea>
                          </div>
                        </div>

						<div class="control-group">
						  <label class="control-label" for="txt_sequence">Sequence: </label>
						  <div class="controls">
							<input class="input-xxlarge" id="txt_sequence" name="txt_sequence" type="text"  value="<?=$row_select["sequence"]?>">
						  </div>
						</div>

						<div class="control-group">
						  <label class="control-label" for="txt_published_date">Publish Date: </label>
						  <div class="controls">
							<input class="input-xxlarge" id="txt_published_date" name="txt_published_date" type="date" required value="<?=$row_select["published_date"]?>">
						  </div>
						</div>


                        <div class="control-group success">
                          <label class="control-label" for="txt_is_featured">Is Featured: </label>
                          <div class="controls">
                            <select class="input-xxlarge" id="txt_is_featured" name="txt_is_featured">
                             <option value="1" <?php if ($row_select["is_featured"] == '1') { echo("SELECTED"); } ?>>Yes</option>
                             <option value="0" <?php if ($row_select["is_featured"] == '0') { echo("SELECTED"); } ?>>No</option>
                            </select>
                          </div>
                        </div>


                        <div class="control-group success">
                          <label class="control-label" for="txt_status">Status: </label>
                          <div class="controls">
                            <select class="input-xxlarge" id="txt_status" name="txt_status">
                             <option value="1" <?php if ($row_select["status"] == '1') { echo("SELECTED"); } ?>>Active</option>
                             <option value="0" <?php if ($row_select["status"] == '0') { echo("SELECTED"); } ?>>In Active</option>
                            </select>
                          </div>
                        </div>
                      </fieldset>
                    </div>





                    <div id="pane4" class="tab-pane">
                      <!-- panel 4 data *start* -->
                      <h4>Photograph </h4>
                      <fieldset>
                                                <?php
							// Photograph panel: show what is really on disk, and always allow a replacement upload.
							$thumbnail_file   = $row_select["thumbnail"];
							$thumbnail_path   = "../updata/service_categories/w100/".$thumbnail_file;
							$thumbnail_exists = (strlen($thumbnail_file) > 0 && is_file($thumbnail_path));

							$image_file   = $row_select["image"];
							$image_path   = "../updata/service_categories/w800/".$image_file;
							$image_exists = (strlen($image_file) > 0 && is_file($image_path));
						?>
                        <div class="control-group">
                          <label class="control-label" for="txt_thumbnail">Thumbnail:<br> (100px X 100px) </label>
                          <div class="controls">
                            <?php if (strlen($thumbnail_file) > 0 && $thumbnail_exists) { ?>
                            <div style="margin-bottom:10px;">
                              <img src="<?=esc($thumbnail_path)?>?v=<?=filemtime($thumbnail_path)?>" alt="Thumbnail" style="max-width:100px; border:1px solid #dddddd; padding:3px; background:#ffffff; vertical-align:middle;">
                              <a class="btn btn-danger btn-mini" href="delete_services_categories_thumbnail.php?id=<?=$id?>" title="Delete" data-rel="tooltip"><i class="icon-trash icon-white"></i></a>
                            </div>
                            <?php } else if (strlen($thumbnail_file) > 0) { ?>
                            <div class="alert alert-danger" style="margin-bottom:10px;">
                              The record points at <strong><?=esc($thumbnail_file)?></strong>, but that file is missing from <code>updata/service_categories/w100/</code>. Please upload it again.
                            </div>
                            <?php } ?>
                            <input class="input-file uniform_on" id="txt_thumbnail" name="txt_thumbnail" type="file" accept="image/*">
                            <span class="help-block"><?php if (strlen($thumbnail_file) > 0) { echo "Choose a file to replace the current thumbnail."; } else { echo "JPG, PNG, GIF or WEBP."; } ?></span>
                          </div>
                        </div>
                        <div class="control-group">
                          <label class="control-label" for="txt_image">Image:<br> (800px X 600px) </label>
                          <div class="controls">
                            <?php if (strlen($image_file) > 0 && $image_exists) { ?>
                            <div style="margin-bottom:10px;">
                              <img src="<?=esc($image_path)?>?v=<?=filemtime($image_path)?>" alt="Image" style="max-width:300px; border:1px solid #dddddd; padding:3px; background:#ffffff; vertical-align:middle;">
                              <a class="btn btn-danger btn-mini" href="delete_services_categories_image.php?id=<?=$id?>" title="Delete" data-rel="tooltip"><i class="icon-trash icon-white"></i></a>
                            </div>
                            <?php } else if (strlen($image_file) > 0) { ?>
                            <div class="alert alert-danger" style="margin-bottom:10px;">
                              The record points at <strong><?=esc($image_file)?></strong>, but that file is missing from <code>updata/service_categories/w800/</code>. Please upload it again.
                            </div>
                            <?php } ?>
                            <input class="input-file uniform_on" id="txt_image" name="txt_image" type="file" accept="image/*">
                            <span class="help-block"><?php if (strlen($image_file) > 0) { echo "Choose a file to replace the current image."; } else { echo "JPG, PNG, GIF or WEBP."; } ?></span>
                          </div>
                        </div>
                      </fieldset>

                      <!-- panel 4 data *end* -->

                      <!-- panel 4 data *end* -->
                    </div>
                    <!-- tab panel data *end* -->
                  </div>

                  <!-- tab *end* -->
                </div>
                <div class="form-actions">
                <input type="hidden" id="id" name="id" value="<?=$id?>">
                  <button type="submit" class="btn btn-primary">Save changes</button>
                  <button type="reset" class="btn">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- DATA * END * -->

  </div>
  <!-- CONTAINER ROW * END * -->

  <!-- FOOTER * START * -->
  <hr>
  <footer>
    <?php include("footer.php"); ?>
  </footer>
  <!-- FOOTER * END * -->

</div>
<!-- CONTAINER * END * -->

<?php include("js.php"); ?>
</body>
</html>

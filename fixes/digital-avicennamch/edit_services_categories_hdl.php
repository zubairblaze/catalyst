<?php
	include("../conn/conn.php");
	check_session_admin();

	include("includes/functions.php");
	//////////////////////////Check Permission Start//////////////////////////////////////////
	$fid='*11,';
	check_features_permissions($_SESSION["users_features_id"], $fid);
	//////////////////////////Check Permission End//////////////////////////////////////////

	// CSRF validation
	csrf_validate();

	// where the resized files live
	$dir_image     = "../updata/service_categories/w800";
	$dir_thumbnail = "../updata/service_categories/w100";

	// recieve posted data * start *
	$id = (int) ($_POST["id"] ?? 0);

	if ($id < 1)
	{
		$msg_type = "alert-danger";
		$msg = "No record was selected to edit.";
		header("Location: view_services_categories.php?msg=".urlencode($msg)."&msg_type=".urlencode($msg_type));
		exit;
	}

	$txt_name        = $_POST["txt_name"];
	$txt_seo_name    = $_POST["txt_seo_name"];
	$txt_title       = $_POST["txt_title"];
	$txt_type        = $_POST["txt_type"];
	$txt_catagory    = (int) ($_POST["txt_category"] ?? $_POST["txt_catagory"] ?? 0);
	$txt_description = $_POST["txt_description"];

	$txt_sequence = (int) $_POST["txt_sequence"];

	$txt_is_featured = (int) $_POST["txt_is_featured"];
	$txt_status      = (int) $_POST["txt_status"];

	$txt_published_date = $_POST["txt_published_date"];
	// recieve posted data * end *

	// a category can never belong to itself
	if ($txt_catagory === $id)
	{
		$txt_catagory = 0;
	}

	// read the current record so we know which files to replace
	$stmt_current = mysqli_prepare($con, "SELECT image, thumbnail FROM services_categories WHERE id = ?");
	mysqli_stmt_bind_param($stmt_current, "i", $id);
	mysqli_stmt_execute($stmt_current);
	$result_current = mysqli_stmt_get_result($stmt_current);
	$row_current = mysqli_fetch_assoc($result_current);
	mysqli_free_result($result_current);
	mysqli_stmt_close($stmt_current);

	if (!$row_current)
	{
		$msg_type = "alert-danger";
		$msg = "Record not found.";
		header("Location: view_services_categories.php?msg=".urlencode($msg)."&msg_type=".urlencode($msg_type));
		exit;
	}

	// the same name may not be used twice inside the same parent category
	$stmt_check = mysqli_prepare($con, "SELECT id FROM services_categories WHERE name = ? AND belong_to = ? AND id <> ?");
	mysqli_stmt_bind_param($stmt_check, "sii", $txt_name, $txt_catagory, $id);
	mysqli_stmt_execute($stmt_check);
	mysqli_stmt_store_result($stmt_check);

	if (mysqli_stmt_num_rows($stmt_check) > 0)
	{
		mysqli_stmt_close($stmt_check);
		$msg_type = "alert-danger";
		$msg = "Record Already Exists.";
		header("Location: edit_services_categories.php?id=".$id."&msg=".urlencode($msg)."&msg_type=".urlencode($msg_type));
		exit;
	}
	mysqli_stmt_close($stmt_check);

	// update record in db * start *
	$date_now = date('Y-m-d');
	$time_now = date('H:i:s');
	$updated_by = $_SESSION["user_name"];

	$stmt_update = mysqli_prepare($con, "UPDATE services_categories SET
		name = ?, seo_name = ?, title = ?, type = ?, description = ?, belong_to = ?,
		sequence = ?, is_featured = ?, date_updated = ?, time_updated = ?, updated_by = ?,
		published_date = ?, status = ?
		WHERE id = ?");

	mysqli_stmt_bind_param($stmt_update, "sssssiiissssii",
		$txt_name,
		$txt_seo_name,
		$txt_title,
		$txt_type,
		$txt_description,
		$txt_catagory,
		$txt_sequence,
		$txt_is_featured,
		$date_now,
		$time_now,
		$updated_by,
		$txt_published_date,
		$txt_status,
		$id
	);

	$result_update = mysqli_stmt_execute($stmt_update);

	if (!$result_update)
	{
		$db_error = mysqli_stmt_error($stmt_update);
		mysqli_stmt_close($stmt_update);
		$msg_type = "alert-danger";
		$msg = "Error while updating record. ".$db_error;
		header("Location: edit_services_categories.php?id=".$id."&msg=".urlencode($msg)."&msg_type=".urlencode($msg_type));
		exit;
	}

	mysqli_stmt_close($stmt_update);
	// update record in db * end *

	$upload_errors = array();

	// upload image and update record in db * start *
	if (isset($_FILES["txt_image"]) && isset($_FILES["txt_image"]["error"]) && $_FILES["txt_image"]["error"] !== UPLOAD_ERR_NO_FILE)
	{
		$image_error = "";
		$base_name = $id . "_" . date('YmdHis');
		$file_name = save_resized_upload($_FILES["txt_image"], $dir_image, 800, $base_name, $image_error);

		if ($file_name !== "")
		{
			$stmt_img = mysqli_prepare($con, "UPDATE services_categories SET image = ? WHERE id = ?");
			mysqli_stmt_bind_param($stmt_img, "si", $file_name, $id);
			mysqli_stmt_execute($stmt_img);
			mysqli_stmt_close($stmt_img);

			if ($row_current["image"] != "" && $row_current["image"] != $file_name)
			{
				delete_upload_file($dir_image, $row_current["image"]);
			}
		}
		else
		{
			$upload_errors[] = "Image: ".$image_error;
		}
	}
	// upload image and update record in db * end *

	// upload thumbnail and update record in db * start *
	if (isset($_FILES["txt_thumbnail"]) && isset($_FILES["txt_thumbnail"]["error"]) && $_FILES["txt_thumbnail"]["error"] !== UPLOAD_ERR_NO_FILE)
	{
		$thumbnail_error = "";
		$base_name = $id . "_" . date('YmdHis');
		$file_name = save_resized_upload($_FILES["txt_thumbnail"], $dir_thumbnail, 100, $base_name, $thumbnail_error);

		if ($file_name !== "")
		{
			$stmt_thumb = mysqli_prepare($con, "UPDATE services_categories SET thumbnail = ? WHERE id = ?");
			mysqli_stmt_bind_param($stmt_thumb, "si", $file_name, $id);
			mysqli_stmt_execute($stmt_thumb);
			mysqli_stmt_close($stmt_thumb);

			if ($row_current["thumbnail"] != "" && $row_current["thumbnail"] != $file_name)
			{
				delete_upload_file($dir_thumbnail, $row_current["thumbnail"]);
			}
		}
		else
		{
			$upload_errors[] = "Thumbnail: ".$thumbnail_error;
		}
	}
	// upload thumbnail and update record in db * end *

	if (count($upload_errors) > 0)
	{
		$msg_type = "alert-danger";
		$msg = "Record updated, but the upload failed. ".implode(" ", $upload_errors);
	}
	else
	{
		$msg_type = "alert-success";
		$msg = "Record updated successfully";
	}

	header("Location: edit_services_categories.php?id=".$id."&msg=".urlencode($msg)."&msg_type=".urlencode($msg_type));
	exit;

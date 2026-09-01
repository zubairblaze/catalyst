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
	$txt_name = $_POST["txt_name"];
	$txt_seo_name = $_POST["txt_seo_name"];
	$txt_title = $_POST["txt_title"];
	$txt_type = $_POST["txt_type"];
	$txt_catagory = (int) ($_POST["txt_category"] ?? $_POST["txt_catagory"] ?? 0);
	$txt_description = $_POST["txt_description"];

	$txt_sequence = (int) $_POST["txt_sequence"];

	$txt_is_featured = (int) $_POST["txt_is_featured"];
	$txt_status = (int) $_POST["txt_status"];

	$txt_published_date = $_POST["txt_published_date"];
	//recieve posted data * end *

	$stmt_check = mysqli_prepare($con, "SELECT id FROM services_categories WHERE name = ? AND belong_to = ?");
	mysqli_stmt_bind_param($stmt_check, "si", $txt_name, $txt_catagory);
	mysqli_stmt_execute($stmt_check);
	mysqli_stmt_store_result($stmt_check);

	if (mysqli_stmt_num_rows($stmt_check) > 0)
	{
			mysqli_stmt_close($stmt_check);
			$msg_type = "alert-danger";
			$msg = "Record Already Exists.";
			header("Location: add_services_categories.php?msg=".urlencode($msg)."&msg_type=".urlencode($msg_type));
			exit;
	}
	mysqli_stmt_close($stmt_check);

	// insert record to db * start *
	$date_now = date('Y-m-d');
	$time_now = date('H:i:s');
	$created_by = $_SESSION["user_name"];

	$stmt_insert = mysqli_prepare($con, "INSERT INTO services_categories (
		name, seo_name, title, type, description, belong_to, sequence, is_featured,
		date_created, time_created, created_by, date_updated, time_updated, updated_by, published_date, status
	) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

	mysqli_stmt_bind_param($stmt_insert, "sssssiiisssssssi",
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
		$created_by,
		$date_now,
		$time_now,
		$created_by,
		$txt_published_date,
		$txt_status
	);

	$result_insert = mysqli_stmt_execute($stmt_insert);

	if (!$result_insert)
	{
		$db_error = mysqli_stmt_error($stmt_insert);
		mysqli_stmt_close($stmt_insert);
		$msg_type = "alert-danger";
		$msg = "Error while saving record. ".$db_error;
		header("Location: add_services_categories.php?msg=".urlencode($msg)."&msg_type=".urlencode($msg_type));
		exit;
	}
	else
	{
		$last_insert_id = mysqli_insert_id($con);
		mysqli_stmt_close($stmt_insert);

		$upload_errors = array();

		// upload image and add record to db * start *
		if (isset($_FILES["txt_image"]) && isset($_FILES["txt_image"]["error"]) && $_FILES["txt_image"]["error"] !== UPLOAD_ERR_NO_FILE)
		{
			$image_error = "";
			$base_name = $last_insert_id . "_" . date('YmdHis');
			$file_name = save_resized_upload($_FILES["txt_image"], $dir_image, 800, $base_name, $image_error);

			if ($file_name !== "")
			{
				$stmt_img = mysqli_prepare($con, "UPDATE services_categories SET image = ? WHERE id = ?");
				mysqli_stmt_bind_param($stmt_img, "si", $file_name, $last_insert_id);
				mysqli_stmt_execute($stmt_img);
				mysqli_stmt_close($stmt_img);
			}
			else
			{
				$upload_errors[] = "Image: ".$image_error;
			}
		}
		// upload image and add record to db * end *

		// upload thumbnail and add record to db * start *
		if (isset($_FILES["txt_thumbnail"]) && isset($_FILES["txt_thumbnail"]["error"]) && $_FILES["txt_thumbnail"]["error"] !== UPLOAD_ERR_NO_FILE)
		{
			$thumbnail_error = "";
			$base_name = $last_insert_id . "_" . date('YmdHis');
			$file_name = save_resized_upload($_FILES["txt_thumbnail"], $dir_thumbnail, 100, $base_name, $thumbnail_error);

			if ($file_name !== "")
			{
				$stmt_thumb = mysqli_prepare($con, "UPDATE services_categories SET thumbnail = ? WHERE id = ?");
				mysqli_stmt_bind_param($stmt_thumb, "si", $file_name, $last_insert_id);
				mysqli_stmt_execute($stmt_thumb);
				mysqli_stmt_close($stmt_thumb);
			}
			else
			{
				$upload_errors[] = "Thumbnail: ".$thumbnail_error;
			}
		}
		// upload thumbnail and add record to db * end *

		if (count($upload_errors) > 0)
		{
			$msg_type = "alert-danger";
			$msg = "Record saved, but the upload failed. ".implode(" ", $upload_errors);
		}
		else
		{
			$msg_type = "alert-success";
			$msg = "Record saved successfully";
		}

		header("Location: edit_services_categories.php?id=".$last_insert_id."&msg=".urlencode($msg)."&msg_type=".urlencode($msg_type));
		exit;
	}

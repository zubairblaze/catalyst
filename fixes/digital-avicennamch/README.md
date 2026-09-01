# digital.avicennamch.com — Services Categories fixes

Two problems were reported on the admin panel:

1. **Editing a services category never saved anything.**
2. **After uploading a picture, no thumbnail appeared**, so there was no way to
   tell whether the file was uploaded.

## 1. Why edits did nothing

`edit_services_categories_hdl.php` on the server is a **byte-for-byte copy of
`edit_services_categories.php`** (both uploaded files have the same MD5,
`bc33f43cdda7944893e98ee135da954d`). The form posts to the handler, the
"handler" is just the form again, so it re-reads the row from the database and
redraws the same screen. No `UPDATE` statement existed anywhere — the edit form
had no back end at all. The page looked like it reloaded normally, which is why
it seemed as if the change was simply ignored.

`edit_services_categories_hdl.php` in this folder is a real handler: CSRF check,
permission check, duplicate-name check that skips the record being edited, a
prepared `UPDATE`, image/thumbnail replacement, then a redirect back to the edit
screen with a success or error message.

## 2. Why the thumbnail never showed

The old upload code wrote the file name into the database **whether or not the
resized file was actually created**:

```php
$image->save($address_thumbnail_l);          // no return value checked
mysqli_stmt_execute($stmt_thumb);            // file name saved regardless
```

So any of the following produced a database row pointing at a file that does not
exist — and the edit screen drew it as a CSS `background:url(...)`, which shows
as an empty box rather than a broken image:

* `updata/service_categories/w100/` or `w800/` missing or not writable
  (these folders are not created automatically);
* a WEBP upload, which the old `SimpleImage` class cannot read even though
  `validate_image_upload()` accepts it;
* a file bigger than `upload_max_filesize` — `$_FILES[...]['error']` was
  non-zero, the whole upload block was skipped silently.

Fixes:

* `includes/functions.php` gains `save_resized_upload()` / `resize_image_file()`,
  which resize with GD directly (JPG, PNG, GIF, WEBP, transparency preserved,
  small images never upscaled), create the destination folder when missing, and
  **only report success once the file exists on disk with a non-zero size**.
  The database is updated only on success; otherwise the reason is shown on
  screen. `upload_error_message()` translates PHP upload error codes into plain
  English. Nothing that already existed in `functions.php` was changed.
* `edit_services_categories.php` now renders previews as real `<img>` tags with a
  cache-busting `?v=<filemtime>`, always shows the file input so a picture can be
  replaced without deleting it first, and prints an explicit warning when the
  record names a file that is not on disk.
* `add_services_categories_hdl.php` uses the same helper and reports upload
  failures instead of silently swallowing them.
* Replacing a picture deletes the old file, so the folders stop filling up.

## 3. Files

| File | What to do |
| --- | --- |
| `edit_services_categories_hdl.php` | **Replace** — this is the fix for edits not saving |
| `includes/functions.php` | **Replace** — original content kept, upload helpers appended |
| `add_services_categories_hdl.php` | Replace |
| `edit_services_categories.php` | Replace |
| `add_services_categories.php` | Compare with yours (the uploaded copy was empty) — the form **must** keep `enctype="multipart/form-data"` and the fields `txt_thumbnail` / `txt_image`, or no file ever reaches the server |
| `check_services_categories_uploads.php` | Optional diagnostic page, delete when done |

Upload them into the same admin folder that holds the current files, keeping
`includes/functions.php` inside `includes/`. **Back up the current files first.**

## 4. After uploading

1. Open `check_services_categories_uploads.php` in the browser while logged in as
   admin. It reports the PHP upload limits, which image types GD supports, whether
   `updata/service_categories/w100` and `w800` exist and are writable, and lists
   every record whose picture is missing from disk.
2. If a folder cannot be created, create it manually and give it write permission
   (typically `755`, owned by the web-server user):

   ```
   updata/service_categories/w100
   updata/service_categories/w800
   ```
3. Re-upload the pictures for any record the check page lists as missing — those
   rows were saved before the fix and their files were never written.
4. Edit a category, change the name, save: the message bar should say
   "Record updated successfully" and the new name should be in the field.

Note that `delete_services_categories_thumbnail.php` and
`delete_services_categories_image.php` are still linked from the edit screen and
were not part of this change.

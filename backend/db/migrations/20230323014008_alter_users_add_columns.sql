-- migrate:up
ALTER TABLE users ADD otp varchar(500) AFTER profile_image_url;
ALTER TABLE users ADD otp_key varchar(500) AFTER otp;

-- migrate:down


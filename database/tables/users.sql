DROP TABLE IF EXISTS users;

create table users
(
    id 						    BIGINT UNSIGNED NOT NULL auto_increment 				COMMENT 'Primary key',
    email 					    VARCHAR(40) NOT NULL								    COMMENT 'Email address',
    password 					VARCHAR(80) NOT NULL								    COMMENT 'Crypted password',
    username 					VARCHAR(40) NOT NULL									COMMENT 'Username',
    additional_info             LONGTEXT NULL                                           COMMENT 'User profile info as JSON stringified',
    sys_create          	    BIGINT UNSIGNED											COMMENT 'Creation timestamp',
    sys_update          	    BIGINT UNSIGNED											COMMENT 'Last update timestamp',

    PRIMARY KEY 				(id)

) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 DEFAULT COLLATE = utf8mb4_general_ci		COMMENT 'Users table';

DELIMITER ;;

DROP TRIGGER IF EXISTS trg_users_bi;
CREATE TRIGGER trg_users_bi BEFORE INSERT ON users FOR EACH ROW
BEGIN
    DECLARE curtime BIGINT;
    SET curtime = UNIX_TIMESTAMP();
    SET NEW.sys_create = curtime;
    SET NEW.sys_update = curtime;
END;;

DROP TRIGGER IF EXISTS trg_users_bu;
CREATE TRIGGER trg_users_bu BEFORE UPDATE ON users FOR EACH ROW
BEGIN
    SET NEW.sys_update = UNIX_TIMESTAMP();
END;;

DELIMITER ;

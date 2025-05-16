CREATE DATABASE  IF NOT EXISTS "Heart" /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `Heart`;
-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: mysql-1d417f71-dmener-1595.k.aivencloud.com    Database: Heart
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '308b652a-055b-11f0-8e19-2295f4a9e862:1-51';

--
-- Table structure for table `history`
--

DROP TABLE IF EXISTS `history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `history` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uid` int NOT NULL,
  `age` int NOT NULL,
  `sex` tinyint(1) NOT NULL,
  `cp` tinyint NOT NULL,
  `trestbps` int NOT NULL,
  `chol` int NOT NULL,
  `fbs` tinyint(1) NOT NULL,
  `restecg` tinyint NOT NULL,
  `thalach` int NOT NULL,
  `exang` tinyint(1) NOT NULL,
  `oldpeak` float NOT NULL,
  `slope` tinyint NOT NULL,
  `ca` tinyint NOT NULL,
  `thal` tinyint NOT NULL,
  `target_multi` tinyint NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `userst_table_key_idx` (`uid`),
  CONSTRAINT `userst_table_key` FOREIGN KEY (`uid`) REFERENCES `users` (`id`),
  CONSTRAINT `history_chk_1` CHECK ((`age` between 20 and 90)),
  CONSTRAINT `history_chk_10` CHECK ((`oldpeak` between 0.0 and 6.0)),
  CONSTRAINT `history_chk_11` CHECK ((`slope` in (0,1,2))),
  CONSTRAINT `history_chk_12` CHECK ((`ca` between 0 and 3)),
  CONSTRAINT `history_chk_13` CHECK ((`thal` in (1,2,3))),
  CONSTRAINT `history_chk_14` CHECK ((`target_multi` in (0,1,2,3,4))),
  CONSTRAINT `history_chk_2` CHECK ((`sex` in (0,1))),
  CONSTRAINT `history_chk_3` CHECK ((`cp` in (0,1,2,3))),
  CONSTRAINT `history_chk_4` CHECK ((`trestbps` between 80 and 200)),
  CONSTRAINT `history_chk_5` CHECK ((`chol` between 100 and 500)),
  CONSTRAINT `history_chk_6` CHECK ((`fbs` in (0,1))),
  CONSTRAINT `history_chk_7` CHECK ((`restecg` in (0,1,2))),
  CONSTRAINT `history_chk_8` CHECK ((`thalach` between 60 and 220)),
  CONSTRAINT `history_chk_9` CHECK ((`exang` in (0,1)))
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `history`
--

LOCK TABLES `history` WRITE;
/*!40000 ALTER TABLE `history` DISABLE KEYS */;
INSERT INTO `history` VALUES (1,1,63,1,2,145,233,1,1,150,1,1.3,2,3,3,4,'2025-03-20 11:17:45'),(2,1,84,1,3,170,262,0,1,96,1,1,2,0,2,3,'2025-03-20 11:26:20');
/*!40000 ALTER TABLE `history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mobile_no` varchar(15) NOT NULL,
  `dob` date NOT NULL,
  `gender` tinyint(1) NOT NULL,
  `password` varchar(255) NOT NULL,
  `profile_photo` longblob,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `mobile_no` (`mobile_no`),
  CONSTRAINT `users_chk_2` CHECK ((`gender` in (0,1)))
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'John Doe','johndoe@example.com','9876543210','2000-05-15',1,'$2b$10$sqCAGv6bH0lCTISKepYLs.oAiFC8GYWVNjjhv4CG4W3Nqm.s88shu',_binary '�\��\�\0C\0\n\n\n\n\r\r#%$\"\"!&+7/&)4)!\"0A149;>>>%.DIC<H7=>;�\�\0C\n\r;(\"(;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;��\0\0\�\0\�\"\0�\�\0\0\0\0\0\0\0\0\0\0\0\0\0\0�\�\0>\0\0\0\0!1AQa\"q2B��#R���\�3Cbr\��%$c����\�\0\0\0\0\0\0\0\0\0\0\0\0\0\0�\�\0#\0\0\0\0\0\0\0\0!1AQ\"Bqa�\�\0\0\0?\0\�\���r\�mB8<Ԫ\�n��$yl\0+Τs�SDgi\'�NE�L;��s^+7@)g�N���\r\�c�\"Xpǚ��\�	4\�䁚\0q\�Fvջ\"R|\�*�2(\�k\�07(=\�\�\�?b\�Wyw\�\�\�G&�\�\�4,�\�M\��8��¹\��y��[�HL�\�^}\��?{u1�\�\�[�F�\"#�N�\�$l,��\�\�~j�[�{pT\nI\�SL�\�*\�MVEnE7#v{R\�4\\m�Za\�7*����p{U��AD��ݦ��\"q!�5\�r7qڢ\�ŷT�,2z\�!$G\�Ir9\�*\0�%\��P��u)�\�$jHL�Sڣ߹\�{�J�\0x�\�du��<�X�\�\�ڣm\�\�P\"N�i6W��׊v�\�|\�\�\��\01فیR@s�\�N�\�E��5�2}(�K���\�CV-t�B\�巳���CEm<�J�͗�?��+@g\�\'�+\08���D\�W̸���\�n�a�]�O��f\�q?ޥ\�+\�阿��\�RGvmc*��ǽm��=!~��\�\'�E4x[Dv\�]��؇ae23n�\�x�\�0�\�\�~ղoh��\�\��\0�SPI\��1�ɪ\\\'����#\�\�Ye#�4��s�ַ�!\�\�\�ac\�͌�R��N�-p\�/�2�CMN/ȩ�\�y�j\���\�⼸ӯlI[�I�?\�B*;y\�<�\\�\�T�G*\0į5\�-���S�;p�\�xIU!�\�j`%p�23R�\�ۗ��Wa�\Zwg=hV\�\�S\�*�(���\�J�*�\������n�f�L�\�x5,a�\�4.\��<�r�\�W��\�)ȩmm\�\'�Eo\�#vA�\�\�gW7eԥ�P�\�-�ұ��\�\r\�{�h\�\�\rsQ���●\�]/N�����֨~22\��o5H-#$�\�w\��S)�RVf,�\�\���|}\�I��>QEb\�t\r)s�N\���Me�E\�\�\����\��oʰ:��5M^a��&?�\�\��_F�u}Oƚ~���Q`p���\�_}��r�D\�{����`wD\'\rP��xoH���V��BÕm�}k\'�U��\�-Ǐ5�\�\�QcC\�*\�i���{s\�t�|�Kw �1�m�c\��[\�i%�\"�F��\�ÆG�{�+�z+�ʤ\���r\�\�&��Wզ!\��E�m)4MZK)��T1m�\�4\�\r&�*��q\�:�Ϧ)����\�\Z\�ֱ��\�\�����xIs�\�\�O\�Q3Bg\�j��3��j�\�Qn/\Zk$\"ON:\��B�jT��Vqap	۞ÊkY\�3\�Y�\02M]�l\�\Zg�\�?�<��\Z2\�ڈ\�暑3�lk�i����\�2�2��W\�\'�R�\�u]\�\�\�c;Z7��d\�E���u	�Ϡ�S6��	P�\��\��1�鄵ͫ��ƃp�\�9M\����$C\�o��Cs\Z�\�Y\�?\�\'$}Eo��\\&\�겯\�;\n�\�\�v��AEu}Gº�\��Kt�?Z\�\�~\0\�\�\�i�\�W��a��w��#:2�\�> \ZT®�U����`�T��B��������/uB�7��m\�;O\�o\�Z�x\�Ju|\�\�\�|���o\n0:R�(\�z%���\�OV\�\'󫥆\�\�\�\���,�*��\�m׫g�\0\�>.񡅍��\r����ՎL��\�¾ �E��|\�ǿ�\0Z\�ϊ\�)�\�)={\�{\�%\�fK3I�8\'��]Ӵu�\�\�l�6s򬩐G�\0\�\�NOf\�Q���pK��fFI\�QG�>@\��\�\�Z\rnՓQ�\�\nȲq\�=(Eʅ�\\\�J�\��\�\�\����\�\�.�\0<�F4�㲕.��<w�p���\�z�mo-��V.\�\r�\0\�Ƥ�i\��vKO\�wz�\�M2[�\"9<\��S\�+�\�Y\�C\�.\'x�v�df \��\�?�5��9�ų\�e�|\�9\�z/�v�.��iFx ��\�\�.v�\�\�\�J\�\�{f�{�ߣ9\�nĨ�w\r$�\r�\�\�L��c쐙`�k@\�\�\0�4L\\�罵W��,\�wЁێ�UnZ\�T�Q\�˙�i=W�ڟ-R1��J\�CR{눬��Y\�¶\�.�Dpz*\�\�_kA�2�p�\"\�%+܏z?\�[J\�m�գ�� ���\'\�w�6��\r1��Ine\�0\0\���Z\�\"Qt\�>\�\�ڍ圷�=�/L�t��\�\�]X\�`�H0\�#\�\�\�\�\�Q��Y\��{���\��/�Z>�ݫ?ga6�	��:aP)�$�V\�H)=\"i�F�I����\�A$�!vRO\�}�y\�-\"\�\\��W��aqm\�\�a�\�:�U\r,�\0��l�\�\�\�$m�5v�S{mf;�#c&\�HQ�T�\�\����\�F����r\\�\��z�Ν*���\�U\�j��bl\�\���+�=��\�9\�)&���7��\�I\0#s��o��\����5;>Ѱ\��dG��\0\�|\�08I`{�g��iq�\�Ʋ˵׀\��\�\�ְ���KVu�g\�:^��τE?i�a�\�Q\�5{��\��\0��\�Ү��Q>j�9��6�E3��\0�\�R�\�Z������}*�Y�D\�r\���\�I攤��\���x�\�\�.�bp\�v���z\�S\�!�K�\�d3�gz\�\�._S�O\��_0\0�\�J\�J9[��nP�R@=�#�y�\�k��\n�v:E��\�t�T4r\��n\�G\�o���\�[j\��\�\�\"�F~wǎ�㧨�v/6��\�x�s,�\�ld۩\'\�x\�{Tw\r{Lk�\�ю��\�NOE�=kʐڷfV\�y\�+\�[$�95Zk���F1�\�\�J�\�A&\�\�\�\�23C&���\�b\�\�Ԛ銿��m\�2��RE�s#�\�;\�Y\�\";6�F\�4\��\�?\�UI.\�/\�\�6\�ʠ|�\������\�\�N���rm\�>����\�\����:w���h\�A\"4�,����\�����\��pY�:�?��㜯9>�sO�����\�1�E��7�\���\�\�\�\�\�\�y�r\��`c\�\�޼\�|��\�\�ž̽燯�\�:W|҂Dl��\�\�zT\�t76\��AaՇ̀�\'Em\�G��\�\�Vw?)?u9\��1\��\�a���\�[y��o��Þ�ӷ��JW\�%��8�k�\��\�|�\�D\�\��\�#�;֥uQ��<WQ���^$�ݸ�\Z_��b\�٧���\0�ј\0\�\�\�G�\�,/�:��1�H����J���PG\�Ek<jk�ԩ�/_�V\�Z@J���vl\��N�tm�6\�34��dm\�aPXg�\��\�\�A\�\���ޮ\�\�ݤ�\�\�\�L�6���]��{�C�\�ƴ���$�kMM|1��V?uV?�\��\�A�\��`1m\�&�[�WM�\�ͼ7\�2y1\�:\�\�WaБ���~7\�tx\�k�\��&q\�O�N3�v\'�j\�()SB|��k�/��ṱ�X`/��\�0�qӑ֩�\'2,�s�\r��2[�;��X\�\�C�\�[\�Q�8���6�\�\�aa��\�x\�Ł���8׵@-�x\�\�,��I�\�o\�ό\�O�Kk�	C򜟼�\�*U�>u�\�$`�\�r\r*\�-։iy;\�1ԼA \�#`���\���k�y-\�c�\�\0=�χ\�\�w%�\�9$�\\�]����٘�~�\�3;j#�����㷒r����\�y�\���w���Bǜs��\�-\�\���8\�\�Zm\nk(5�|��\�IȮ\\�⭣H�a\r\Z\�\�ޡV�)-��%G�������\�\�R�Ժ��	\�C޲\�P�)#Ԑ�\��\0\��4z\��\�\�5�~�\��\�s�\�y\�o��M�U�Sמ\�e�h&\����*�#\�3��\�R\���31\�\�ޤӬ�y���\��{\Z�UF6�\�ҋ\�\�e�\��aO���\0��\�I-.�;R�@\'�#��\� ,�\'\��|���F\�\�\��\'=�Ef�Zd�ѫ�{����\�\n82,raA\��ڌ\���\�ܲ\�v$̝=9\���XM7S�9>iDq>H\�;@\��\�Oy\n�kXG\��O�=�+�x�I\Z)VѸ�\��\��6�B�\�\n�\�9\�4[�H5خ\�q\�D&\�kW�\��\�-.�[\�6�3*yʹ�6�==hߋ�_N��6h�-��Fxlw<}),1\�/\�9��X��V��\�˷C&VP�0�\�\'\�ƈ.��n���ۅ��\�\�����ݵ���F~�\���^j��qu`[\�\�/3��@\�=8=\r)\�^�PSX�0�k�1dUfXAހ��\�#8�k*�\�\�\\09� ~Yc�\�+�\�x�)��Ao$�X�9\��\�?�;R��\��p�\�\�\�\Ze�L2���\�8��.�F\�\�<n\�9��\�9V4��|q\�Z\'p�Z\����K��\�Q\�;\�\�iV��\�v�\ZA��08\�\0\�9\�?�@�MŎ���|V\�x\���!\�\�=��WZ��\�v/��k�Ty��cZ\�\�2�Q�x�I8�\�Oq�խ�\��\�jK�v��7V�F~��\�3ŒZ\�\��\n\�D�\�S�t�\�j��h�0�u]-\�{k�\�\��\�61���\��Q$\�\�˗\nK�7hRxU�\�\�L\�c\r\���\�?N��A\'����xdF��\0\�>���\�h\�\�>\�eϜy�}jΥw���ssMʝ��\�Rz�\�\�Z\����<�\�\�\��\�\�W\'ޕX��\�ВH��\ZU\��&u���X\���\��\�1�k�\�G$2�.C\�\��85Ҭ\�*A\�@<{��\��\�&��\0\�s�\�TאFJ\�N[�B9p��ɩ.�\�\��>��\�\�:�O\��u\�\�d\'\�@�\�dY�[�t��\�8eo\���gn[\�$)<O\�26\�\�\0d��J\"���\ZŮ^\�\�g\�\���`\�\�$�U��?Ne�\�*\��M\�8㷭Y\�n!E�	!&\�\�-\�L�\�p\��4q�j���fѳz�F\n\��\�@�:\�++\�I3���jq)���\�5��p\�\�Gq��\�iJD\�m\'b��ħ��\�	[\�#1:��l�\�GSD\�{9$��\��R�p�\�+�\0\�\�y��Eӌw\�c{��\�~�ʌ�\�y.��Hn��a�\0P8*y\�\\\��ɣJt��i-�XΡ����6v�3���r\�$��F<�\�\�W�?�^ӵ{\�<��9���q(�hG8��c>�:\�\�mf�\�^��\0\0g���\�T�^DY�\�Ƨn\�\\\�`\�\��A\�}A�n��I\r\�Y\�L[D�S$S�o�=@\�d���~�\�,�et�p�g;|\�\�aKF�̖���ﵚR�7�g\0��s9JSm.�i%L\�O���d\�2d1�#��\�j�\�\�L�[v3H�`\�AWC��:ֿR�\�\�\�ͬ}\�\�c\�2\n���ң����t�\�,L\�ċ\�g�\�\�kE�I��el&�K֣Y7H�b�\�\�ź�b�\"�H\�^\�\���\�UprH\�J�Z���\�6\�$��0̍�a��\\��\�W �\"TY#38A\�\���(q���\�iPj��hm�8w\�!�9cԯ�\�\�^M�j/q�\�\�O)>@J\�A9#����\�&��R�\�|΀�9#i\�#\�9��\�\�\�\�\\�\�/RW\�c\���\�m\�J7\�\�5trC��\0�&-\�F�\0�\n\�(\�E�bh4\�\�ʱ\"XY�A\�v\�k3\�Z\�\���\�\��\�9	\�Fzb=�Ca�\�,W̑�;n@�:g�e91\']1�\�_\�	kl�`�qU�<�=�q\�L�]*8-\�E�<\�\�\0�\��h\�\�k<\�n�$�c.B\�̑q\��Fz���%k+\��5xg��S/@I\�s�Ւ�yW�\�\�͸�xw\�Y�\�iS\�y/�HNy\�\�J�\�:=�c�\�Q(���Il�#�m�]�\'O��A�vc\�j\�o�ݢQ�����{\�|\�\\n�l\�H�\�w\"X\���Z@>M݈��q��b\�\�Z9V_�ve��u\���^\�:�G\"�\�K�\�2����\�\\�U��4	n�P\�\�o$�)��\�W�+��\'��Z`	\�i��u-\�s�ąe\0�\�*\�\�IO\�,gn\�\�\n@���\��FFh\�\�\�\���~D�� |���2h�ū\�z�9�\�+p\�&�7��\��\n\�W�\�%+�\'�v�\0\�J胵h�dn59c\�$\Z�M���Ɠ�\�t\�<�Xq$��A\�>�J�D�\�\�0�b�Ӹ���\����J�Ă\�\�\�t�M�+�nۇs�\�D�-�%{f\�\��\�Si�\0\���XKܒ1�\��\�\�\\\�[�67\�\rӃ;R\�y\��k�x;\�1j\Zk\�_J�A;Jl�s\�z�Ak}y*#6�FU�mU\���\�p�6f\n�V{�D��k�Fb��B\�{I?6|\�\'\�\�x��\0P�\�@@��v�iq�\�FʣhS�\�t8U#7}�*\�\�z�\�AH�c�!s�n�4\�\��i\��ͭ\�\���9~J������p\�Lm!T$�ǦNz~�\�b\\#\�2?�r\��z)\�ͦ�\�+h\�VFB���n@�\��\0\n^9�����ՠ�9<�-\�a\r\�,��sY];O7R\Z���\0�}��z���%֛�\\\�8\�\��e�;����\�:P\�O^\0v�gp�K\\Iq\�ȥL��\�Ŀ�\�\�A\�n.t\�\�F�\�>[�p��OOj7�#i2\�\�HVx\�\�+����ۊ�i�\�u�\�os~\�<��\0fX��t#\"��\0)a�i�\�\r��r\�9\�q��\�\�\�(��$� ����`�$�\\��\��܏ҫY \�\�b�w��bS���Uލ{c5\�\r�����4�x\�[Fԭ��\�-n\�Yℷ��\�=�~j��|�k�\r�=���\�n�#��E�Y爂0�\��\0c^$S\�\�c1ʅ��x\'�\\t&P�����>\��ҭ?�|\'�\0�x�c�5��\�\����\��f�uF\r�6\�nN54Oڢ�Sa|����5�(!\�f�w���f�O�0{qT#5a	\�Z��2^!�eա{\�9\�\�\�`�x��X�\�:��\�Y�ӯ����\�\�IX \����E+#V*ø�:ޗg�ZH�\���\�\��k	\�\�I�&[\��\0A��־*�c�f2�y�ʽ�S�	�ՓG�Ǒf�?��A�\��i�xW\�\��2ΈX\�I,\�\�{\�(�\�\�y\�d2iX�e\�$\�\�\�q\�䔜��ޟ���mo�8�\�\n��.܎��9\�\�&�ec\"̪Ȋ�\�3�\Zĺ]X]�\�\�\�\�=\�\��\Z�<�\��ļ�9l�N�\�<��j�\�\�\�6�\�B\�\�?\�oG���[f�uf\�#R;�Y).\�U��\�j.�;�$\�#�z78շ\�\���G*\�R�L�R�\�<�\0\�y����\�\�C�%Y�8�Q并 �v>�\\\\�y�1��JI;����\�uI*Y���Q\�Wo�+\n�!ۂ\'+\�S]\�&�\�E�wFr6���+�m�i�\0qm(�F�_�<7N@֟/2T*���(\�4��Km\��\�2��\�qǴ@\�\��1ڭ\�\�\���D�\�\�	��`N\�++}0^��\�! g=}\�h�\�\�mK�g\�\�mSj��3���G��#\�\�Q]\�1\�#_�\�[\'1��cӞ�(5��bM>m:XD�ȸ\0���?�h\���Z���\�m\���$\n�\� �\�뷡\�&x-\�\�\r\�-\�</�G@U���\�Z�\�Y{�o&�\�Vf|�\�_�\0I\�:(,���]�M���[m%��\�x\�1Y(�kx�,��\�\�1\�֭\���{6zޞ\�X���\�c\�\�vR;��:��x~o\�1A�<��f\\��r{�ǭk�3�j\Z��i�^\�$*D\�<��p�\�sӭt]3K�\�\���@��ܚ\�;Vȓ<\�t{MN�\�\�0�9c���$�ҫ��]Fg.�j����)�E֪ʝj\0�\�e�x\�����PS�\'�QK��~뎫H�_V\�\�\�\�Ϙ\�1\�x�4:\���!N�q�JؤQi:ia\��4\��\r������8#l\�Nz�$wm\�\\ZE#���v�\�*�\�\�Lҹ\�1ɩP\�sJ]��g��\0\�\�\�\�\�I� $��N}\�\rd\�>\�|Af\�$6�]�:\�K\��85\�TԪ\�֥E%H��^XK`\�;\�K�W���Ggl.�|�R\�g\0�\�}+\�\'��%U�?u�a�\Z�/����\�ֻ�Ѯ\��(qu�8�V��\�ʉ*�� )\�9\�S粺\'�\�D\���#?��v�\�i7֦�9\�x�X~g�\0��6��f]zB6���/\�j\�{Hn�g��qϺF�	95�\�u+�\�e�\�	�dP\�p\���\"�d���\0\�[�rbaSE�_{\�X�B �~*g�\��\nTV׮��W�3��k�\�G\\0�z\�m3YY�]�\�\�d\�a�\�\�C\�[\��\0\�j�·��\�%6�\��\��jKo��(Y�\�֑X��\n瞵��\��ĥ/l\�z��7�6W�V��eex\�?(e=�2�׶�:��\����1�\�)B��5\�#�n�!KlӪ�\�\��\�1E��\�>\���g�\0\�F\�\�`ry���M~�rW��Y�;]�f���H,��\�-\�*��\�z\�g��~��i�i;&�\�r��\��/\�5�\�^��\��d\�\n\0\0v\�\�58\ZБ��M\�*`s\�Z�\�W�*\'���E���`\�H#���\�P<T�k�d\�Y�\��gn\�X�-\�%l\�����P}\�CJ\�E�ڳ�y�\����\�\��엲]���!\�ʟʛz@H��[��5!obhO\�ܿ\�Q�{�nI�\"\�r*J,�T�\�KRH	���i�(�E0\Zx��x���\�\"AN�\r<\Z`<S�L��\�\�&��I\�/4t^}\�+&S�D�\�jQUD�\�*niP8�D\�V�\�\n\���\�/_d�4~\�\05������F\��R\0D���M���C%����\�h=�3o\�E��Y� �\�\�7\�(���-�\�\�hO|\r¼6\�\�Q=�7��T�a�}{K�\�\�\���c��\0\Z#\�J�Dq�\��o��߃J`Ѷ\�#�\�\��S�a\�\�b�\0/P�G��YG\�W��)��hf<\n\�$ڿ}FO\��T\���}��\�Ё��1\Z�)4\�G�\�Q�5�H��4��\0\'&�Elj\�\�\0���\�W�#�\�\n?SU��e#�H�˹\�X���1�64�\�j�r�S�\n�sJ��@H\�I�V\�\"�*̡�RۚT�\�4\�J�\04\�M0�R�@\r0{W�@��J�\�<�\�K\�\�*T\0\�n)\�\�ڕ*\0�m\�L�JT���\"��\�:T��:��ҥTʵ �S\�yJ�\0yJ�*\0�\�'),(5,'John Doe','johndoe@examle.com','9877543210','2000-05-15',1,'$2b$10$j5PDJlhlY5vg0BgL3X7e9.81EJqYJFLmTWSopOGOeZ67R7xj6Z0Gi',NULL),(6,'John Doe','johndoe@esamle.com','9877548210','2000-05-15',1,'$2b$10$6xH7dJ/9E/0RzwZReT0MH.OHK6QFQBigbuOvL6kRQEy/Wc7oK9gYy',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'Heart'
--
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-23 20:07:06

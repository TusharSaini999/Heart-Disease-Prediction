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
-- Table structure for table `histery`
--

DROP TABLE IF EXISTS `histery`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `histery` (
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
  CONSTRAINT `histery_chk_1` CHECK ((`age` between 20 and 90)),
  CONSTRAINT `histery_chk_10` CHECK ((`oldpeak` between 0.0 and 6.0)),
  CONSTRAINT `histery_chk_11` CHECK ((`slope` in (0,1,2))),
  CONSTRAINT `histery_chk_12` CHECK ((`ca` between 0 and 3)),
  CONSTRAINT `histery_chk_13` CHECK ((`thal` in (1,2,3))),
  CONSTRAINT `histery_chk_14` CHECK ((`target_multi` in (0,1,2,3,4))),
  CONSTRAINT `histery_chk_2` CHECK ((`sex` in (0,1))),
  CONSTRAINT `histery_chk_3` CHECK ((`cp` in (0,1,2,3))),
  CONSTRAINT `histery_chk_4` CHECK ((`trestbps` between 80 and 200)),
  CONSTRAINT `histery_chk_5` CHECK ((`chol` between 100 and 500)),
  CONSTRAINT `histery_chk_6` CHECK ((`fbs` in (0,1))),
  CONSTRAINT `histery_chk_7` CHECK ((`restecg` in (0,1,2))),
  CONSTRAINT `histery_chk_8` CHECK ((`thalach` between 60 and 220)),
  CONSTRAINT `histery_chk_9` CHECK ((`exang` in (0,1)))
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `histery`
--

LOCK TABLES `histery` WRITE;
/*!40000 ALTER TABLE `histery` DISABLE KEYS */;
INSERT INTO `histery` VALUES (1,1,63,1,2,145,233,1,1,150,1,1.3,2,3,3,4,'2025-03-20 11:17:45'),(2,1,84,1,3,170,262,0,1,96,1,1,2,0,2,3,'2025-03-20 11:26:20');
/*!40000 ALTER TABLE `histery` ENABLE KEYS */;
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
INSERT INTO `users` VALUES (1,'John Doe','johndoe@example.com','9876543210','2000-05-15',1,'$2b$10$sqCAGv6bH0lCTISKepYLs.oAiFC8GYWVNjjhv4CG4W3Nqm.s88shu',_binary 'ÿ\Øÿ\Û\0C\0\n\n\n\n\r\r#%$\"\"!&+7/&)4)!\"0A149;>>>%.DIC<H7=>;ÿ\Û\0C\n\r;(\"(;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;ÿÀ\0\0\È\0\È\"\0ÿ\Ä\0\0\0\0\0\0\0\0\0\0\0\0\0\0ÿ\Ä\0>\0\0\0\0!1AQa\"q2B‘#R¡±Á\Ñ3Cbr\áð%$c‚²ñÿ\Ä\0\0\0\0\0\0\0\0\0\0\0\0\0\0ÿ\Ä\0#\0\0\0\0\0\0\0\0!1AQ\"Bqaÿ\Ú\0\0\0?\0\Æ\çš™r\ãmB8<Ôª\Ãn©«$yl\0+Î¤sŒSDgi\'“NE“L;œðs^+7@)gN¹ \r\Äc¥\"XpÇšñø\Î	4\Ýäš\0q\ÜFvÕ»\"R|\Þ*¸2(\ék\Â07(=\Õ\×\í?b\çWyw\Ü\Ô\ÐG&š\Í\È4,\ÛM\ïò¶8¡¥Â¹\äš÷y”€[½HL’\ì^}\èƒ?{u1\Ø\ã­[’F¥\"#ŽNœ\â$l,¦ž\â\Ú~j’[™{pT\nI\ÏSLõ\è*\ÍMVEnE7#v{R\Ã4\\m«Za\Æ7*š”œp{U°óAD Ý¦·Ž\"q!Á5\Ðr7qÚ¢\ÞÅ·T™,2z\Ð!$G\æ¥Ir9\Í*\0©%\Ó£P…ƒu)ö\ï$jHLSÚ£ß¹\Î{šJ²\0x§\íduô¯<¥X÷\ï\ëÚ£m\Ä\äP\"NŽi6Wù×Šv®\ì|\Ô\à\å˜­\01ÙÛŒR@sƒ\ÅN«\çE–ü52}(ðKÀ¦–\ÏCV-týB\ïå·³™ÁôCEm<®JÁÍ—–?ûŽ+@g\Ï\'Ÿ+\08­‘ðD\ÅWÌ¸µ€÷\Ën©að]œO¹µf\Ïq?Þ¥\Î+\Èé˜¿‡Á\éRGvmc*±üÇ½m¿ñ=!~õý\Ù\'®E4x[Dv\ß]´¾Ø‡ae23n\äžx©\â0´\Ì\È~Õ²oh§¥\Õ\Øÿ\0ñSPI\àý1‡Éª\\\'ü¡¶#\â\ÌYe#­4Œ¶sŠÖ·‚!\ç\È\Öac\ÛÍŒ­R¸ðNµ-p\Ý/¬2‚CMN/È©™\Ðyýj\ÔÁ¸\äâ¼¸Ó¯lI[«I¢?\ïB*;y\Þ<¨\\©\ëT„G*\0Ä¯5\à-Ž„ƒSœ;p¹\ÍxIU!¸\Çj`%p¬23R¾\ÝÛ—§¥Wa‚\Zwg=hV\Ç\ÞS\Å*ñ (›÷ƒ\íJ€*¬\Ìªœ©¤‘n f¡Lý\Ðx5,a€\È4.\×ó<²r«\ÜW…°\Ä)È©mm\î\'œEo\Ë#vAš\Ø\égW7eÔ¥òPó\å§-úÒ±ÀŽ\Ì\r\Ì{’h\æ\á\rsQÁù·â—\á]/Nðö—¤¨Ö¨~22\Çó©o5H-#$²\àw\Ï÷S)¤RVf,¾\Î\í£ˆ|}\ÛIŽ¡>QEb\Ót\r)sœN\ÃñýMeüE\ã\è\í²‘¾\çoÊ°:‡Š5M^a‘’&?½\É\Ìó_FŠu}OÆš~›ý¼Q`p±Œš\Æ_}©—r°D\Ò{±¬¶¡`wD\'\rP¾­xoH´¹ñV¯»BÃ•m }k\'•U²«\Ñ-Ç5¹\Æ\èQcC\è*\â­i›™÷{s\Ít‰|£Kw ’1˜m´c\Óª[\ßi%‘\"ˆF’¡\ØÃ†G®{ý+™z+‰Ê¤\×õ™r\ï\Ç&¢WÕ¦!\ì£“Eõm)4MZK)®›T1m¸\È4\Û\r&µ*¯»q\Â:õÏ¦)ýŠ®…\Ä\Z\ÚÖ±›ñ\É\åñ´xIïš¹s \Ý\ÚO\å°Q3Bg\ïj ¶3²³j”\ÐQn/\Zk$\"ON:\Ñ´B¿jTþòœVqap	ÛžÃŠkY\Í3\ÖYº\02M]¡l\é\Zg\à»?Š<»€\Z2\ÃÚˆ\Íæš‘3­lk”iþ¸»—\Ê2¤2“…W\Ï\'úR·\Ôu]\å\â\êc;Z7ö¡d\ÝEƒ´u	þÏ ¹S6©	P\É˜\Ôü1«é„µÍ«²Æƒp¦\é9M\ëñ­¥$C\ÅoôŸCs\Z­\ÙY\ã?\ë\'$}EoþŽ\\&\Þê²¯\Ê;\n–\á\ív®ÀAEu}GÂº¹\Ä•Ktž?Z\Ä\ë~\0\Ô\ì\Ëi‹\ÈWŸ”aÀúw®…#:2¥\Ã> \ZTÂ®ŒU‘•Á`ŠTÀŒB€¼úõ®ð÷/uB·7»­m\Ï;O\Þo\íZx\ÛJu|\â\ï\ä|©ô­o\n0:R°(\éz%†‘Ž\ÒOV\Ç\'ó«¥†\Ü\ç\ë\ëô¦,‹*´¬\Ûm×«gÿ\0\ê±>.ñ¡…µ€\rŒñõôÕŽLª¨\ÆÂ¾ ñE¶›|\ëÇ¿ÿ\0Z\åšÏŠ\ïµ)\Ê)={\Õ{\É%\ÔfK3I»8\'·µ]Ó´u–\î\×l¢6sò¬©Gÿ\0\Ú\á–NOf\ÉQ™»¶pK´žfFI\ïQGº>@\ÉÀ\Û\íZ\rnÕ“Q¹\Å\nÈ²q\ì=(EÊ…Œ\\\ÇJ¸\Êô\Ä\Ñ\ìú„ò\Í\Í.ð\0<F4ùã²•.¬À<w pŠ™ \Çz±mo-Œ¹V.\Ò\r¡\0\ÍÆ¤´i\ÉôvKO\éwz…\ÒM2[\"9<\×ÀS\Ç+Ÿ\éY\ÍC\Æ.\'x´v–df \Èü\ç?º5‰’9Å³\Èe˜|\Â9\Üz/ó­v™.—¦iFx ø›\Ô\É.vª\Ù\ç\ëŸJ\Ë\ëŒ{fõ{–ß£9\â‰nÄ¨÷w\r$ó\rŽ\í\ÇLŠ¡cì™`—k@\å¶\ì\0õ4L\\ç½µW¹,\ãwÐÛŽ•UnZ\ÃTóQ\×Ë™‰i=WºÚŸ-R1”¹J\ØCR{ëˆ¬¦øY\ÍÂ¶\é.¡Dpz*\í’\Ü_kAµ2òpŒ\"\Ú%+Üz?\á­[J\ÕmšÕ£¸³ À…\'\Ôw£6ú„\r1¶ŠIne\áƒ0\0\Ç·¿Z\ã\"Qt\â>\ä\äÚåœ·²=´/LøtŠ\Ò\Ú]X\Ã`žH0\Ì#\Ê\é\Ù\ì\íQý Y\éú{Àöö\é·/™Z>‡Ý«?ga6¤	œ:aP)þ$úV\ïŽH)=\"i§F¯I¶³–ö\ÒA$’!vRO\È}­y\â-\"\Ë\\²“W·¸aqm\É\ãa\Û:ûU\r,ÿ\0ƒül²\È\à\ç$m¹5vûS{mf;ˆ#c&\ÙHQ‰Tô\ã\Ó‚µ–\×F•ù£ð«r\\ý\éözÎ*½»°\ÇU\ìjö¥bl\ï\äŒ±‰+ô=ª¢\í9\è)&¬Áª7žñ\ÉI\0#s÷£oºõ\Óôûø5;>Ñ°\ËþdGªÿ\0\Õ|\Ù08I`{­g„¼iq§\ÝÆ²Ëµ×€\äð\Ã\ÐÖ°›øKVug\Ã:^º‡Ï„E?i£aý\éQ\Ø5{¼¶\àÿ\0¨\ÔÒ®¤ýQ>j“9¾¼6‘E3¸ÿ\0õ\ÍRü\ÚZ‡ö²±ý}*‚Y—D\Ðr\Çö³\ÌIæ”¤’¬\Êý¤xÀ\é\Ð.›bp\îv¿„z\ÖS\Ã!¤Kˆ\ä¸d3£gz\ã¦\Ö._SñO\Ëù_0\0÷\ÏJ\ÆJ9[´žnP•R@=ˆ#½y¹\åk³¢\nƒv:Eµ£\æt‰T4r\Ãón\çG\áo¨¡º\Ä[j\Æú\Ú\Ü\"†F~wÇŽ„ã§¨«v/6‹¦\Ëx‰s,“\ÇldÛ©\'\Õx\ä{Tw\r{Lkµ\ÝÑŽ›†\ÙNOEü=kÊÚ·fV\ây\Í+\ì[$·95Zk‡¸¹F1ƒ\ê\ãJö\ÌA&\Ã\Ë\í\Ã23C&»·‹\æ¸b\Þ\ËÔšéŠ¿˜ñ¹m\é2»‚REs#ù\Õ;\ÍY\ã\";6‘F\Ü4\Í÷\Û?\ÈUI.\î/\å\á6\ÂÊ |©\ïõ÷«¶¶\Ñ\ÞNˆ·rm\ã>þõ¾¡\Ø\ç›ù†ƒ:w›§øh\ÝA\"4²,‹°˜\çŒþ†­\í´pY²:?“¸ãœ¯9>ôsOð‚½±ž\Þ1¶E•ú7¢\àö¢\Í\á\Ö\Ó\å\Øyr\ÃŒ`c\é\×Þ¼\Ù|ˆ¦\é\í“Å¾Ì½ç‡¯´\í:W|Ò‚Dl„‚\ë\ÏzT\îtï·76\ÌòAaÕ‡Ì€ô\'Em\áŠG²š\Þ\îVw?)?u9\éü1\Íµ\Ôa±´–\Î[y£±o—üÃžŽÓ·¥³JW\ì%º8ºkø\á–÷\á|\ÞD\Ã\æ‘\Ó#¶;Ö¥uQ¤Á<WQŸˆ’^$ˆÝ¸ \Z_ˆ¬b\ÔÙ§¶™\0òÑ˜\0\Ç\Ï\éGõ\Ø,/ü:š¢1“H¬ƒ¹JüÀPG\èEk<jkôŒÔ©™/_V\åZ@Jªü vl\ÔúN¡tm„6\Ö34Œdm\ÏaPXg™\Öù\Ö\ÝA\ë\ÜûÞ®\è\åÝ¤Œ\ß\Â\ÐL†6€’¹]ÀŒ{ñCŠ\áÆ´¡‹$÷kMM|1ñ÷V?uV?´\Ùñ\éA›\ÄÁ`1m\ß&À[œWM‰\íÍ¼7\ë2y1\ä:\ä\ÆWaÐ‘Ž¢±~7\Òtx\åk˜\áò&q\ÈOºN3œv\'j\Å()SB|‘•kù/¥ò¥tÌ­X`/ö¨\ç·0’qÓ‘Ö©˜\'2,‘s€\ršü2[­Í¾öˆX\ç•\ÇCù\×[\ÕQ8›š6\Î\ÔaaŠû\Ìx\ÂÅ€8×µ@-¤x\Û\Ê,»õI’\Ío\ÙÏŒ\ßO¿Kk™	CòœŸ¼¿\Ü*U‚>u¤\ë$`«\Ær\r*\Þ-Ö‰iy;\Û1Ô¼A \å#`ƒúš\Ïý¢k¹y-\ác·\î\0=¨Ï‡\ä\Ûw%Á\å’9$üÂ“\\·]¼’òùÙ˜œ~½\ê3;j#Š­” ã·’r¤ù£ƒ\èy©\í§ºw­€BÇœsŸý\æª-\ê\Å8\Î\íZm\nk(5†| Ÿ\ÄIÈ®\\²â­£H«a\r\Z\ä\ÝÞ¡V–)-Œ%GÀ´úý¬¾’\æ\ÙRˆÔº²ó	\ÇCÞ²\×P‹)#Ô‚\Íø\0\ç¨÷4z\îõ\Ê\â5ˆ~œ\ìý\ìsü\Åy\Òo’”M©U£S×ž\æe¸h&\Ûó¿ô¡*Ÿ#\Ë3¢\åR\ÝÀÁ31\ã‘\×Þ¤Ó¬¥yªƒ\ÏŽ{\Z÷UF6Œ\äÒ‹\è“\áe‚\ßöaO™øÿ\0ª’\ÖI-.ƒ;R…@\'©#Šœ\É ,¦\'\à—|÷þµF\â\Ü\É™\'=°Ef¿ZdõÑ«°{ø¤Žú\Û\n82,raA\ÈƒÚŒ\Üø¶\ÜÜ²\ìv$Ì=9\ÇþñXM7Sš9>iDq>H\Ù;@\çõ\â­Oy\n•kXG\Ï÷O¾=ý+šxI\Z)VÑ¸›\Äó\Ýù6²B\Û\nù\ã9\Ç4[’H5Ø®\âq\ÜD&\ë»kWø\ãø\Ð-.[\Ä6ñ3*yÍ´‚6®==hß‹¬_N¹Š6hˆ-‚ÁFxlw<}),1\Ç/\È9¶¶X“V·†\×Ë·C&VPÁ0˜\ç\'\ßÆˆ.„n¹ø‰Û…†¹\à\Äõ¬…­Ýµ²‚ŒF~ð\Éù^jþqu`[\à\ä/3û@\Î=8=\r)\Æ^ÁPSXð´0¨k³1dUfXAÞ€“’\È#8ýk*ñ\Ü\Ù\\09š ~Ycò\ê+°\Øx²)–¿Ao$¹X™9\ßÀ\ê?µ;Rµð\ßøp¼\Ô\í\Õ\Ze•L2ž½\ë8üž.«F\Ø\å<n\Ó9¶™\â9V4…›|q\ÜZ\'p¶Z\åšù®ñK“™\ÈQ\î;\Ð\ïiV­²\évò\ZA‹©08\è\0\Ç9\È?¥@šMÅŽ‚·|V\ëx\Ýñó!\Î\Ç=»ŒWZ‚’\ä´v/›Žk†Ty©øcZ\Ñ\Ì2—Q…x¥I8Á\èOqùÕ­–\æð\ØjK‰v‘¾7VðF~¾´\Ý3Å’Z\Ý\í¿\n\ÂDò\äŽS•tô\Ïj½©hö0ˆu]-\ä{k\Ê\àò\Ð61µ½¹\àúQ$\Ú\ÙË—\nKž7hRxU›\ç\ÚL\Þc\r\ÜŒž\Ì?N½óA\'µ»´¸xdFñ’\0\ã>õ°ð–\ãh\Ó\Ü>\ËeÏœyþ}jÎ¥w¢›‘ssMÊ¨ñ\íRz\Ý\àZ\Â¸¿<£\å\â\é”\á\ÉW\'Þ•X¼‰\ÄÐ’HŒ•\ZU\Ù£&u­ÀºX\ÉÀ”\Éô\Ü1ýk’\ßG$2Á.C\Æ\ìŽ¨85Ò¬\ä*A\ï@<{£·\Þó‰±\Ñ&œÿ\0\Èsõ\ÍT×FJ\ÇN[¹B9pŒ É©.¯\Þ\í„Ž>Ÿó\É\ê:›O\Ô—u\ç\î«d\'\ï@¨\îdYš[†t•²\Ê8eo\íô®gn[\è½$)<O\æ26\Ä\Ù\0dž¿J\"úœ·\ZUÌŠ^\Þ\Úg\Ü\Èü•`\ã\×$ƒUôý?Ne¹\Ý*\åƒùM\È8ã·­Y\Õn!E‚	!&\Þ\Ú-\ÖL\ìp\éõ4qƒjƒ“òfÑ³zƒF\n\çó\Ú@ý:\Ô++\ÄI3°ü jq)¶¹Š\æ5ù£p\Ø\ìGqùŒ\ÕiJD\Òm\'b”ŸÄ§§ð®Ž\È	[\ê#1:’£l\ÆGSD\à{9$¶‚\æŒR†pÀ\í+Ž\0\Ï\êy¨ôEÓŒw\Ûc{±»\Ì~ÊŒô\Íy.‹µHn¡‘aÿ\0P8*y\é\\\ÍÁÉ£Jt¹ðµ£i-©XÎ¡£˜¬‘6vý3Ÿú¡r\è¦$œ«F<¸\Ã\ÎWò?^Óµ{\Ó<¢¢9®•q(‡hG8 úc>”:\ç\âmf–\Ì^¤ˆ\0\0g‚½\éT“^DYð\æ›Æ§n\Ò\\\â`\Ì\Ï÷A\ê}A­nµ¢I\r\ÚY\ÞL[DºS$S¢oò¥=@\àdñž ÷¡~†\Ê,„et“p¸g;|\Ã\ØaKFñÌ–¾žòïµšRˆ7g\0¯µs9JSm.i%L\ÊO¦´d\Ê2d1–#ž¸\Èjú\Â\ÛLº[v3H `\ÌAWCôý:Ö¿Rð\Í\Û\ÞÍ¬}\Î\êc\Ú2\nž¤Ò£²µ·Ÿt¯\Ä,L\ÛÄ‹\Ägõ\ç\èkEI¸´el&ŸKÖ£Y7Hðb\É\ÚÅºùb´\"ñH\Õ^\Þ\Ú‚ˆ\æUprH\íŸJ÷Z±´»\×6\Ü$öó0Ì´a°”\\ðú\éW ¾\"TY#38A\í\Ôóü(q„¦›\ìiPj·¿hmž8w\í!Ÿ9cÔ¯¹\ã\ë^M j/qŠ\æ\ÒO)>@J\ÆA9#ñžµœ\Ò&¸‹R‚\ä|Î€…9#i\Ç#\Ó9®•\Ò\Û\Ú\É\\þ\Ø/RW\ïc\Ð¸ü\èm\ÂJ7\Ø\é5trC¤ÿ\0ò&-\ç”Fÿ\0µ\n\à(\ÄE­bh4\è\ïÊ±\"XY©A\Ïv\æŽk3\ÜZ\Þ\Èöû\î\à€\æ9	\ËFzb=óCa¿\Ö,WÌ‘ž;n@€:gó­e91\']1ó\ê·_\á	kl†`ƒqUÀ<÷=ûq\ëLŸ]*8-\ÒE»<\Ç\Æ\0ô\Ûýh\å\æ©k<\Ún¡$³c.B\çÌ‘q\ÉFzõ¡þ%k+\çŽò5xg˜–S/@I\îsžÕ’ŒyWú\ê\ìÍ¸Àxw\ÎYˆ\êiS\Þy/¸HNy\ã\éJº\È:=»cƒ\ÔQ(ü‹«Il¯#óm§]²\'O¡„A¡vc\èj\ÜoŠÝ¢Qƒñ†®´{\ã|\Ø\\n‚l\àH¿\Üw\"X\ÃùˆZ@>MÝˆ®·q®©b\Ö\ÈZ9V_½ve÷þu\Ïõ^\é:‚G\"ù\ÑK“\ê2²ü¨\ë\\³Uþˆ4	n¥P\Í\åo$±)»±\íWµ+„–\'´Z`	\äi¯Šu-\Üs¬Ä…e\0ž\Ý*\å\ãIO\ç,gn\Ó\É\n@•¾\Æ¸FFh\Û\Ý\È\íõª~D³¡ |‰ø½2hÅ«\Ëzò9\É+p\â&¶7þ·\Ñü\n\×W²\î%+·\'»vÿ\0\ßJèƒµh†dn59c\Ù$\ZÁM¹µðÆ“­\ê…t\è<¸Xq$«”A\Ó>ŸJ“Dð\Ê\Ü0–b¿Ó¸ž¤Ž\çùþ”JóÄ‚\Â\Ù\ít¸M¼+•nÛ‡sŠ\ã–DŸ-›%{f\Ò\ïÁ\ÚSiÿ\0\á€ŠXKÜ’1»\Ûõ\ã\é\\\Ã[µ67\í\rÓƒ;R\áy\Üýk¡x;\Å1j\Zk\Ù_J¨A;Jlºs\Ôz¯Ak}y*#6žFUmU\ïô¬\áp•6f\nûV{˜Dˆ—k™Fb¨üB\Ç{I?6|\Ñ\'\Ñ\áx‡ÿ\0P¤\Å@@¡·viq™\ÔFÊ£hSœ\×t8U#7}*\ß\Æz¬\ÑAHc„!sónô4\Û\Äòi\âòÍ­\í\åø—9~JœõÀ÷õ p\ÞLm!T$Ç¦Nz~”\Æb\\#\æ2?¥r\Ã‹z)\ÊÍ¦“\â+h\ÖVFB«¸œn@£îŽ¹\äÿ\0\n^9´µ¿³´Õ ’9<¢-\ßa\r\×,½ûsY];O7R\Z©”ÿ\0—}¥ýzö­ø%Ö›¤\\\â8\î\í¤e²;¶ž¤‘\ê:P\ãO^\0vgpšK\\Iq\ÙÈ¥L§®\ßÄ¿˜\í\íA\ín.t\æ\äŽF“\Ê>[¶p žOOj7¥#i2\è\ÍHVx\ß\Ì+µ”ƒ‘ÛŠòiš\Óu¹\Ýos~\È<…ÿ\0fXü„t#\"ª•\0)aœi±\ê‘\r±Œr\í9\Úq‘‘\ï\Ï\æ(š$¾ ¤»‰`Š$òž\\•—\ÐñÜÒ«Y \Ò\î­bºwø’bSò–¸þUÞ{c5\Ô\r«€¡€þ4x\ì[FÔ­¬®\î-n\åYâ„·ø\Ú=Ž~j†¹|’kò\rò=šŒÀ\ànÁ#ž E˜Yçˆ‚0ƒ\Ðÿ\0c^$S\Ê\Êc1Ê…¶òx\'½\\t&P‘ƒ“¹>\ã“ùÒ­?„|\'ÿ\0x‹c£5…®\ì\ë÷»…\çùf•uF\r£6\ÐnN54OÚ¢˜Sa|§¨þ5©(!\â­f‹wµº‰f‚O¿0{qT#5a	\ÏZ–‹2^!ðeÕ¡{\Ý9\Þ\î\Ì`´xý¤Xý\à:÷\áYµÓ¯…¿·\È\çIX \éžý«­E+#V*Ã¸ª:Þ—g«ZHŽ\á¹¢ý\æ\í‘ýk	\ã\ÉI¯&[\ìÿ\0A¸¿Ö¾*ócÁf2¡yûÊ½ûSñ	½Õ“G‰Ç‘f¿?¼„Aü\ë¥iñxW\Â\í²2ÎˆX\áI,\ç\Ø{\×(¹\Ð\æ¾y\îd2iX¹e\ç$\äœ\Õ\Îq\Åä”œ¢ÞŸ®¾«mo¦8ò\Ó\n¬±.ÜŽ˜ý9\â­\Ï&™ec\"ÌªÈŠñ\Ã3œ\ZÄº]X]©\Ë\Æ\é\È=\ê\í±\Z‹<ó\ÉòÄ¼¨9lûNõ\Ç<´ôj§\ã\È\ë6“\ÏB\ÅÂŒ\ãŠ?\âoG¸²·[f™uf\ä#R;“Y).\ÑU¤ý\áœj.’;ƒ$\Ð#’z78Õ·\Õ\ÉòôG*\ÐRžLRû\Ù<ÿ\0\Õy¨¡¸„\Ä\åC†%Y¸8©Qå¹¶ œv>•\\\\»y‰1“ŒJI;±”­ü\ÛuI*Y° ¯Q\ëWo¥+\n°!Û‚\'+\íS]\ê&ò\ÆE‰wFr6Œ³š+Ÿm¨iÿ\0qm(‘F¡_›<7N@ÖŸ/2T*ô²¾(\í4‘–Km\Í‹\Ä2ü›\ÃqÇ´@\î\à1Ú­\è\Ö\ëˆ‰D¯\Ê\Î	`N\ë’++}0^”¶\Ü! g=}\Æh¨\É\ØmK£g\á\ËmSj´—3º¼³G¸°#\×\ëQ]\ê1\Ü#_»\Æ[\'1òûcÓž(5—ˆbM>m:XD‘È¸\0õž?­h\ÓÁöZ¶”—\Úm\ÍÀš$\n£\æ ñš\Ïë·¡\Ø&x-\ç\Ñ\r\Ä-\æ</ºG@Už™\íŸZò\ÇY{›o&ö\îVf|«\í_Œ\0I\æ®:(,¯ž’]üM©’¾[m%‡¡\èx\äž1Y(–kxƒ,‘\Ï\Ê1\ÏÖ­\ãü‚{6zÞž\ÑX¬­½\Ôc\Ë\ívR;¯¶:Š¢x~o\ë1A¢<¢šf\\”Žr{÷Ç­k¼3¡j\Zþi½^\Ö$*D\Ç<ª¶pý\ìžsÓ­t]3K²\Ñ\í­Œ@“Üš\ß;VÈ“<\Ñt{MNŽ\Ê\Í0ˆ9c÷œ÷$úÒ«¹¥]Fg.‘jœ•·)ÁEÖªÊj\0’\Úe•x\àŽ¢­£PS¾\'‡QK´¸~ëŽ«H¤_V\Í\Ñ\ì\åÏ˜\Ã1\Æx÷4:\Ú¸!N¬qŸJØ¤Qi:ia\Ñõ4\Òò\rõ‹¦Žò8#l\ÆNz§$wm\æ\\ZE#‘‚ûv·\ê*»\È\ÓLÒ¹\Ë1É©P\ÖsJ]”´gõ¿\0\Ù\ê\î²\Û\ßI  $«¹N}\Æ\rd\ï>\Î|Af\í$6ñ]¦:\ÛK\Éñ85\ÔTÔª\ÇÖ¥E%H³„^XK`\Æ;\ËK‹W¤Œ­Ggl.®|”R\Þg\0¸\ê}+\è\'˜›%U‘?uÀaú\Z¡/‡´‰’\èÖ»óÑ®\Ãü(qu 8„V·–\îÊ‰*œ• )\È9\äSç²º\'š\ÞD\í½£#?Ÿ­v«\ïi7Ö¦ó­9\Èx°X~gµ\0¼û6ø§f]zB6¬°œ/\èj\É{HnŽg§¼qÏºF¿	95­\Ðu+¨\áe·\Ô	‘dP\Èp\ÃÁŠ\"¿dòóÿ\0\Ë[rbaSEö_{\îX¶B „~*g‰\Éô\nTV×®õûW€3Œk\ÌG\\0ýz\Ðm3YY¯]µ\ì\Ýd\ä€a‰\í\ÇC\ï[\Ûÿ\0\ßj±Â·º´\Ñ%6þ\Ýó\íüjKo³û(Yü\ËÖ‘X“\nçžµ›À\ÒüÄ¥/l\æzõœ7·6W¶V–öeex\â?(e=ý2ú×¶—:•…\è‚ò¼‰1ò\Ã)Bþ˜5\×#ðn‚!KlÓª¶\å\ØÁ\Æ1E­´\Í>\Ñ÷Ág¾\0\ÞF\æ\à`ry­£ŠM~‰rW£™Yø;]¿f¶²†H,ƒ\É-\Ù*¥±\Ùz\ägø­~öi£i;&¼\âr‹ˆ\Ôû/\Ï5¬\ï^‡­\ã¢d\Ã\n\0\0v\î\êˆ58\ZÐ‘ù¥M\Í*`s\×Z®\éW™*\'Ž ²Ešªñ`\ÊH#¡¨£\ÇP<T†küd\ÒY‹\éþgn\ãµXñ-\è%l\ÐôùŸúP}\ÅCJ\ÒE“Ú³¼yò\Üƒõ¬\Í\Õõì—²]‰™!\ËÊŸÊ›z@H¦[ø†5!obhO\ï¨Ü¿\ÜQ›{ˆnI©\"\êr*J,«T€\ÔKRH	©¢ði(¯E0\Zx Šx¨Á©\Ð\"AN˜\r<\Z`<S³Lž˜\Ó\×&›€I\Å/4t^}\é¤+&S…D™\êjQUDŽ\Í*niP8¥D\ÉVŠ\Ó\n\Ô¤ñ\Ô/_d¦4~\Ô\05¢¨ö¢µF\ÐûR\0D–ÀõM´öŠC%´Ÿ½\Åh=ª3o\íE³­Yñ Ž\í\ï7\ê(¿Œ-²\ê\ÚhO|\rÂ¼6\Ù\íQ=Š7€þT‡a«}{K¸\Æ\Ë\ÈÁôc´ÿ\0\Z#\ÑJŽDqþ\Ö±o£ÀßƒJ`Ñ¶\Ç#§\Ð\ÐôS…a\ãµ\Ôbÿ\0/PGüYG\ÖW¦§)ú€hf<\n\É$Ú¿}FO\ÉûT\èúƒ}ûù\ÏÐü…1\Z)4\ÑG÷\äQõ5H¥¿4¯ÿ\0\'&­Elj\Â\ß\0û¤¿\ÐWŸ#ý\Õ\n?SU£‹e#ªH‘Ë¹\ÎX“õ«1­64©\Õj€rŒS©\nò˜sJ¼¥@H\åI£V\æ½\"•*Ì¡¤RÛšT¨\Ã4\ÅJ•\04\ÅM0ûR¥@\r0{Wž@ô¥J\Ï<\éK\á\Å*T\0\án)\Â\ßÚ•*\0•m\ÅLJT©ˆ\"ö©\Ò:T©¡:°‘Ò¥TÊµ ©S\íyJ•\0yJ•*\0ÿ\Ù'),(5,'John Doe','johndoe@examle.com','9877543210','2000-05-15',1,'$2b$10$j5PDJlhlY5vg0BgL3X7e9.81EJqYJFLmTWSopOGOeZ67R7xj6Z0Gi',NULL),(6,'John Doe','johndoe@esamle.com','9877548210','2000-05-15',1,'$2b$10$6xH7dJ/9E/0RzwZReT0MH.OHK6QFQBigbuOvL6kRQEy/Wc7oK9gYy',NULL);
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

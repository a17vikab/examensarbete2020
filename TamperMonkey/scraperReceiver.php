<?php
    $fp=fopen("scrapedData.txt","a");
    fputs ($fp, $_POST['str']);
    fclose ($fp);
?>
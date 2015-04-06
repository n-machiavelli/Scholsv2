<?php
	Header("content-type: text");
	
	$path = isset($_GET['file']) ? $_GET['file'] : 'standard_page_includes.txt';
	
	$xml = simplexml_load_file($path);
	$xml = $xml->children('http://www.w3.org/1999/XSL/Transform');  

	$param='';
	$variable='';
	$template='';

	foreach($xml->include as $include) {
		$path=$include->attributes()->href;
		
		$xsl = simplexml_load_file($path);
		$xsl = $xsl->children('http://www.w3.org/1999/XSL/Transform');

		$node=$xsl->param;
		foreach($node as $child) {
			$param .= $child->asXML();
		}
		$node=$xsl->variable;
		foreach($node as $child) {
			$variable .= $child->asXML();
		}
		$node=$xsl->template;
		foreach($node as $child) {
			$template .= $child->asXML();
		}
	}

	$contents ='<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE xsl:stylesheet SYSTEM "http://cdn.illinoisstate.edu/dtd/ou/standard.dtd"><xsl:stylesheet version="3.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:ou="http://omniupdate.com/XSL/Variables" exclude-result-prefixes="ou"> <xsl:output method="xml" indent="yes" encoding="UTF-8" omit-xml-declaration="yes"  /> <xsl:strip-space elements="code"/>'.$param.$variable.$template.'</xsl:stylesheet>';
	$contents = str_replace(array("\r\n", "\r", "\n", "\t",'  ', '    ', '    '), ' ', $contents);
	$contents = str_replace(array('  ', '    ', '    '), '', $contents);

	$dom = new DOMDocument('1.0');
	$dom->preserveWhiteSpace = false;
	$dom->formatOutput = false;
	$dom->loadXML($contents);

	echo $dom->saveXML();
?>

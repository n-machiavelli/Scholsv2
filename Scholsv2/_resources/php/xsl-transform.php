<?php
// Author:		Ryan Christie
// version:	2.1.1

// Handles both local file, http requests, and XSL/XML strings
// Can mix and match the passing of local and http strings or as XSL/XML string

// Usage:

// 	xslTransform('filename.xsl','filename.xml');
// 	xslTransform('http://path.to.com/filename.xsl','filename.xml');
// 	xslTransform('filename.xsl','http://path.to.com/filename.xml');
// 	xslTransform('http://path.to.com/filename.xsl','http://path.to.com/filename.xml');
// 	xslTransform('filename.xsl','filename.xml', array('paramName'=>'paramValue','paramName2'=>'paramValue2'));

// 	$xsl = file_get_contents('feed.xsl');
// 	$xml = curl('http://feeds.illinoisstate.edu/news/news.rss');
// 	xslTransform($xsl,$xml,$params);
// 	xslTransform('filename.xsl',$xml,$params);
// 	xslTransform($xsl,'filename.xml',$params);

// 	$return=xslTransform('filename.xsl','filename.xml',$params,true);

	error_reporting(0);

	function xslTransform($xslPath, $xmlPath, $params='',$rtn=false)
	{
		$doc = new DOMDocument('1.0', 'utf-8');
		$xsl = new XSLTProcessor('1.0', 'utf-8');

		$regXmlStr = "/^<\?xml/";
		$regUrlStr = "/^(https?:|\/\/)/";

		if(preg_match($regXmlStr, $xslPath)){
			$doc->loadXML($xslPath);
		}
		else if (preg_match($regUrlStr, $xslPath)) {
			$doc->loadXML(curl($xslPath));
		} 
		else {
			$doc->load($xslPath);
		}

		$xsl->importStyleSheet($doc);
		if (is_array($params)) { $xsl->setParameter('', $params); }

		if(preg_match($regXmlStr, $xmlPath)){
			$doc->loadXML($xmlPath);
		}
		else if (preg_match($regUrlStr, $xmlPath)) {
			$doc->loadXML(curl($xmlPath));
		} 
		else {
			$doc->load($xmlPath);
		}
		
		$html = $xsl->transformToXML($doc);
	
		if (strlen($html) < 15) {
			$html = "<!--Transform Failed-->";
		}

		if($rtn) {
			return $html;
		}
		else {
			echo $html;
		}
	}

	function curl($url, $params = null)
	{
		$curl_handle = curl_init();
		
		/* Default cURL Parameters */
		curl_setopt($curl_handle,CURLOPT_URL,$url);
		curl_setopt($curl_handle,CURLOPT_CONNECTTIMEOUT,1);
		curl_setopt($curl_handle,CURLOPT_SSL_VERIFYPEER,0);
		curl_setopt($curl_handle,CURLOPT_HEADER, true);
		curl_setopt($curl_handle,CURLOPT_MAXREDIRS,10);
		curl_setopt($curl_handle,CURLOPT_RETURNTRANSFER,1);
		
		/* Set up POST parameters */
		if (is_array($params))
		{
			$post = http_build_query($params, '', '&');
			curl_setopt($curl_handle,CURLOPT_POST,count($params));
			curl_setopt($curl_handle,CURLOPT_POSTFIELDS,$post);
		}
		else if ($params != null)
		{
			$post = $params;
			$params = parse_str($post);
			curl_setopt($curl_handle,CURLOPT_POST,count($params));
			curl_setopt($curl_handle,CURLOPT_POSTFIELDS,$post);
		}
		
		/* Execute and get all return data */
		$buffer = null;
		$buffer = curl_exec($curl_handle);
		$error = curl_error($curl_handle);
		$response = curl_getinfo($curl_handle);
		$headSize = $response['header_size'];
		
		/* Follow redirects if necessary */
		if ($response['http_code'] == 301 || $response['http_code'] == 302)
		{
			$header = substr($buffer, 0, $headSize);
			if (preg_match('/[Ll]ocation:\s*([^\r\n]+)/', $header) > 0)
			{
				$loc = preg_replace("/.*[Ll]ocation:\s*([^\r\n]+).*/is", "$1", $header);
				curl_close($curl_handle);
				return curl($loc, $params);
			}
		}
		
		/* Close and return */
		curl_close($curl_handle);
		$content = substr($buffer, $headSize);
		return $content;
	}

?>

<?xml version="1.0" encoding="iso-8859-1"?>
<!DOCTYPE xsl:stylesheet SYSTEM "http://cdn.illinoisstate.edu/dtd/ou/standard.dtd">
<xsl:stylesheet version="2.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
    xmlns:ou="http://omniupdate.com/XSL/Variables"
    exclude-result-prefixes="ou">
   
	<xsl:output method="html" indent="yes" encoding="iso-8859-1" omit-xml-declaration="yes"  />
		
	<xsl:param name="ou:site" />
	<xsl:param name="ou:filename" />
	<xsl:param name="ou:dirname" />
	<xsl:param name="ou:action" />
	<xsl:param name="ou:path" />
	<xsl:param name="ou:root" />
	<xsl:param name="ou:httproot" />
		
		<xsl:template match="/">
			
			<xsl:variable name="email" select="document/email" />
			<xsl:variable name="analytics" select="concat('utm_source=',normalize-space($email/analytics/source),'&amp;utm_medium=',normalize-space($email/analytics/medium),'&amp;utm_campaign=',normalize-space($email/analytics/campaign))" />
			<xsl:variable name="headline_link"><xsl:value-of select="$email/link" /><xsl:choose><xsl:when test="contains($email/link,'?')">&amp;</xsl:when><xsl:otherwise>?</xsl:otherwise></xsl:choose><xsl:value-of select="$analytics" /></xsl:variable>
			<xsl:variable name="btn_link"><xsl:value-of select="$email/button" /><xsl:choose><xsl:when test="contains($email/button,'?')">&amp;</xsl:when><xsl:otherwise>?</xsl:otherwise></xsl:choose><xsl:value-of select="$analytics" /></xsl:variable>
			
			<xsl:variable name="img" select="concat(substring($ou:httproot,0,string-length($ou:httproot)),$email/image/img/@src)" />
			<xsl:variable name="banner_img" select="concat(substring($ou:httproot,0,string-length($ou:httproot)),$email/banner_image/img/@src)" />
			<xsl:variable name="type" select="$email/type" />
			<xsl:variable name="banner" select="$email/banner" />
			<xsl:variable name="content" select="$email/content" />
			<xsl:variable name="show_details" select="$email/show_details" />
			
			
			<xsl:variable name="stylePath">
				<xsl:call-template name="formatPath"><xsl:with-param name="path" select="$email/style_path" /></xsl:call-template>
			</xsl:variable>
			<xsl:variable name="footerPath">
				<xsl:call-template name="formatPath"><xsl:with-param name="path" select="$email/footer_path" /></xsl:call-template>
			</xsl:variable>
			
			<xsl:text disable-output-escaping="yes">&lt;!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"&gt;</xsl:text>
			
			<html style="background:#f1f1f1" xmlns="http://www.w3.org/1999/xhtml">
				<head>
					<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />

					<meta name="viewport" content="width=device-width, initial-scale=1.0" />
					<title><xsl:value-of select="document/config/title" /></title>
					
					<xsl:comment> ouc:div label="style_head" button="hide" path="<xsl:value-of select="concat($ou:dirname,'/',$stylePath)" />" </xsl:comment>
					<xsl:processing-instruction name="php">include ("<xsl:value-of select="$stylePath" />"); ?</xsl:processing-instruction>
					<xsl:comment> /ouc:div </xsl:comment>
					
				</head>
				<body style="width: 100% !important; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; margin: 0; padding: 0; ">					
					<xsl:if test="$ou:action='prv' or $ou:action='edt'" >
						<div style="display:none">
							<xsl:comment> com.omniupdate.div label="hidden_multi_edit" button="hide" group="everyone" </xsl:comment>
							<xsl:comment> com.omniupdate.multiedit type="text" prompt="hidden" </xsl:comment>
							<xsl:comment> /com.omniupdate.div </xsl:comment>
						</div>
					</xsl:if>
					
					
					<table width="100%" class="body" cellpadding="0" cellspacing="0" border="0" id="backgroundTable" bgcolor="#f1f1f1" style="background-color:#f1f1f1">
					  <tr>
						<td>
						
						<!--BEGIN TOP ROW-->
						
						<table align="center" width="600" class="table-frame" id="tableWrapTop" border="0" cellpadding="0" cellspacing="0" style="height:144px; padding:0; border-collapse:collapse; margin: 0px auto 0px auto; background-color:transparent;">
							<tr>
							<!-- LEFT BACKGROUND -->
								<td valign="top" width="40" class="bg-cell" bgcolor="#f1f1f1" style="height:144px; padding:0; margin:0; background-color:#f1f1f1;">
									<!--left backcground-->
								</td>
								<td style="height:142px; padding:0; margin:0; background-color:transparent; vertical-align:top;">
									<!--Inner Content-->
									<table width="520" border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse; margin: 0px auto 0px auto;">
										<tr>
											<td align="left" valign="top">
											<!--iGuide-->
												<table border="0" cellpadding="0" cellspacing="0" id="iguide" bgcolor="#cc0000" style="background-color:#cc0000; height:48px; width: 100%;">
													<tr>
														<td align="left" width="100%" valign="top" id="university-logo" style="margin:0; padding:0; background-color:#cc0000;" >
															<a href="{$email/iguide/@link}?{$analytics}">
																<img style="display:block; boder:none; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;" src="{$email/iguide/@img}" alt="{$email/iguide/@alt}"/>
															</a>
														</td>
													 
														
													</tr>
												</table>
												
												
												
												
												<!--Header-->
												
												
												<xsl:choose>
													<xsl:when test="$banner='D'">
														<!-- Header - Headline + Date -->
												<table border="0" cellpadding="0" cellspacing="0" id="header" style="border-collapse:collapse; background-color:{$email/header/@bg}; height:96px; width: 100%;">
													<tr>
														 <td align="left" width="390" valign="middle" id="name" style="margin:0; padding:0; height:96px; width:390px;">
															 <h2 class="header-text" style="font: 35px Verdana, Arial, sans-serif; line-height: 100%; color: #fff; font-weight: normal; font-style: normal; text-align: left; text-transform:uppercase; padding: 0px; margin:0 0 0 16px;"><xsl:value-of select="$email/attention" /></h2>
															
														</td>
														<td align="right" valign="middle" width="130" style="width:130px; padding-right:10px; background-color:{$email/header/@date_bg};" id="issue">
															<!--Month-->
															<p class="header-month" id="day" style="font: 16px Verdana, Arial, sans-serif; line-height: 24px; color: #fff; font-weight: normal; font-style: normal; text-transform:uppercase; letter-spacing:14px; text-align:center; padding: 0 0 0 10px; margin:0;"><xsl:value-of select="$email/date/month" /></p>
															<!--Day-->
															<p class="header-day" style="font: 48px Verdana, Arial, sans-serif; line-height: 36px; color: #fff; font-weight: bold; font-style: normal; letter-spacing:4px; text-align:center; padding:0px; margin:0;"><xsl:value-of select="$email/date/day" /></p>
															<!--Year-->
															<p class="header-year" style="font: 18px Verdana, Arial, sans-serif; line-height: 27px; color: #fff; font-weight: normal; font-style: normal; letter-spacing:9px; text-align:center; padding: 0 0 0 10px; margin:0;"><xsl:value-of select="$email/date/year" /></p>
					
														</td>
													</tr>
												</table>
												
												
												</xsl:when>
													
												<xsl:when test="$banner='I'">
													<!-- Header - Image -->
													<table border="0" cellpadding="0" cellspacing="0" id="header" style="border-collapse:collapse; background-color:{$email/header/@bg}; height:96px; width: 100%;">
												<tbody><tr>
													 <td align="left" valign="middle" id="name" style="margin:0; padding:0; height:96px; ">
														 <img src="{$banner_img}" alt="{$email/banner_image/img/@alt}" style="width:100%" width="100%" />
														
													</td>
													
												</tr>
											</tbody></table>
													
												</xsl:when>
												
													<xsl:otherwise>
												
													<!-- Header - Headline -->
												<table border="0" cellpadding="0" cellspacing="0" id="header" style="border-collapse:collapse; background-color:{$email/header/@bg}; height:96px; width: 100%;">
												<tbody><tr>
													 <td align="left" valign="middle" id="name" style="margin:0; padding:0; height:96px; ">
														 <h2 class="header-text" style="font: 35px Verdana, Arial, sans-serif; line-height: 100%; color: #fff; font-weight: normal; font-style: normal; text-align: left; text-transform:uppercase; padding: 0px; margin:0 0 0 16px;"><xsl:value-of select="$email/attention" /></h2>
														
													</td>
													
												</tr>
											</tbody></table>
												
												</xsl:otherwise>
												</xsl:choose>
												
												
											</td>
										</tr>
									</table>
								</td>
							<!-- RIGHT BACKGROUND -->
								<td valign="top" width="40" class="bg-cell" bgcolor="#f1f1f1" style="height:144px; padding:0; margin:0; background-color:#f1f1f1;">
									<!--right background-->
								</td>
							</tr>
						</table>
					
						<!--ROW 2-->
						<table align="center" width="600" class="table-frame" id="table-wrap-row2" border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse; margin: 0px auto 0 auto;">
							<tr>
							<!-- LEFT BACKGROUND -->
								<td valign="top" width="40" class="bg-cell" bgcolor="#f1f1f1" style="height:144px; padding:0; margin:0; background-color:#f1f1f1;">
									<!--left backcground-->
								</td>
								
								 <!-- CONTENT -->
								  
									<td width="488" class="news-item row-full" bgcolor="#ffffff" style="width:488px; background-color:#ffffff; padding: 16px 16px 16px 16px; vertical-align:top;">
										<!-- HEADING -->
										<h2 class="news-link-wrap" style="font: 20px Verdana, Arial, sans-serif; line-height: 120%; color: #c00; font-weight: normal; font-style: normal; padding: 0px; margin:0 0 16px 0;">
											<a style="text-decoration: none; color:#c00;" href="{$headline_link}" class="news-link"><xsl:value-of select="$email/link_text" /></a>
										</h2>
										<table><tr>
											
											<xsl:choose>
												<xsl:when test="$content='N'">
													<!-- WIDER COLUMN -->
													<td width="488" class="cell-a" bgcolor="#ffffff" style="width:488px; background-color:#ffffff; vertical-align:top;">
														<p class="news-description" style="font: 13px Verdana, Arial, sans-serif; line-height: 150%; color: #666; font-weight: normal; font-style: normal; text-align: left; margin:0 16px 16px 0; padding: 0px;">
															<xsl:value-of disable-output-escaping="yes" select="replace($email/desc,'\[(.+?)\]','&lt;$1&gt;')" />
														</p>
													</td>
												</xsl:when>
												
												<xsl:otherwise>
													<!-- WIDER COLUMN -->
													<td width="268" class="cell-a" bgcolor="#ffffff" style="width:268px; background-color:#ffffff; vertical-align:top;">
														<p class="news-description" style="font: 13px Verdana, Arial, sans-serif; line-height: 150%; color: #666; font-weight: normal; font-style: normal; text-align: left; margin:0 16px 16px 0; padding: 0px;">
															<xsl:value-of disable-output-escaping="yes" select="replace($email/desc,'\[(.+?)\]','&lt;$1&gt;')" />
														</p>
													</td>
																						
																						
													<!-- THINNER COLUMN -->
													<td width="220" class="cell-b" style="background-color:#ffffff; width:220px; vertical-align:top; ">	
														<img src="{$img}" alt="{$email/image/img/@alt}"/>
													</td>
												</xsl:otherwise>
											
											</xsl:choose>
					
											
											</tr></table>
										
										<!-- BUTTON -->
										<div class="btn" align="right">
											<xsl:text disable-output-escaping="yes">&lt;!--[if mso]&gt;
											&lt;v:rect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="</xsl:text><xsl:value-of select="$btn_link" /><xsl:text disable-output-escaping="yes">" style="height:64px;v-text-anchor:middle;width:220px;" strokecolor="#48c259" strokeweight="10px" fillcolor="#2e923c"&gt;
					&lt;w:anchorlock/&gt;
					&lt;center style="color:#ffffff;font-family:sans-serif;font-size:20px;font-weight:normal;"&gt;</xsl:text><xsl:value-of select="$email/button_text" /><xsl:text disable-output-escaping="yes">&lt;/center&gt;
					&lt;/v:rect&gt;
					&lt;![endif]--&gt;</xsl:text><xsl:text disable-output-escaping="yes">&lt;![if !mso]&gt;</xsl:text><a href="{$btn_link}" style="background-color:#2e923c;border:1px solid #1ee813c; color:#ffffff;display:inline-block;font-family:sans-serif;font-size:20px;font-weight:normal;line-height:64px;text-align:center;text-decoration:none;width:220px;-webkit-text-size-adjust:none;"><xsl:value-of select="$email/button_text" /></a><xsl:text disable-output-escaping="yes">&lt;![endif]&gt;</xsl:text></div>		
								 
									  
												  
								</td>
							<!-- RIGHT BACKGROUND -->
								<td valign="top" width="40" class="bg-cell" bgcolor="#f1f1f1" style="height:144px; padding:0; margin:0; background-color:#f1f1f1;">
									<!--right background-->
								</td>
								</tr>
							   </table><!--close table-wrap-row2-->
							   <!--END ROW 2-->
							
							<xsl:if test="$show_details='Y'">
							<!-- BEGIN SPACER -->
							<table align="center" width="600" class="table-frame" height="16px" border="0" cellpadding="0" cellspacing="0" style=" height: 16px; margin: 0px auto 0 auto; background-color:#f1f1f1;">
								<tr>
									<td height="16px" bgcolor="#f1f1f1" style="height:16px; background-color:#f1f1f1;">
										<!--spacer-->
									</td>
								</tr>
							</table>      
							<!-- END SPACER -->
							
							<!--ROW 3-->
						<table align="center" width="600" class="table-frame" id="table-wrap-row2" border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse; margin: 0px auto 0 auto;">
							<tr>
							<!-- LEFT BACKGROUND -->
								<td valign="top" class="bg-cell" width="40" bgcolor="#f1f1f1" style="height:144px; padding:0; margin:0; background-color:#f1f1f1;">
									<!--left background-->
								</td>
								
								 <!-- CONTENT -->
								<td width="488" class="news-item row-full" style="width:488px; background-color:#585858; padding: 32px 16px 16px 16px; vertical-align:top;">
										
									<p class="news-description" style="font: 16px Verdana, Arial, sans-serif; line-height: 150%; color: #fff; font-weight: normal; font-style: normal; text-align: left; margin:0 16px 16px 0; padding: 0px;"><xsl:value-of disable-output-escaping="yes" select="replace($email/details,'\[(.+?)\]','&lt;$1&gt;')" /></p>
											
					  
												  
								</td>
							<!-- RIGHT BACKGROUND -->
								<td valign="top" class="bg-cell" bgcolor="#f1f1f1" width="40" style="height:144px; padding:0; margin:0; background-color:#f1f1f1;">
									<!--left background-->
								</td>
								</tr>
							   </table><!--close table-wrap-row2-->
							   <!--END ROW 3-->
								
							</xsl:if>
							
					   
							<!-- BEGIN SPACER -->
							<table align="center" width="600" class="table-frame" height="16px" border="0" cellpadding="0" cellspacing="0" style=" height: 16px; margin: 0px auto 0 auto; background-color:#f1f1f1;">
								<tr>
									<td height="16px" bgcolor="#f1f1f1" style="height:16px; background-color:#f1f1f1;">
										<!--spacer-->
									</td>
								</tr>
							</table>      
							<!-- END SPACER -->
							
								
							<xsl:comment> ouc:div label="footer" button="hide" path="<xsl:value-of select="concat($ou:dirname,'/',$footerPath)" />" </xsl:comment>
							<xsl:processing-instruction name="php">include ("<xsl:value-of select="$footerPath" />"); ?</xsl:processing-instruction>
							<xsl:comment> /ouc:div </xsl:comment>
									
									
								</td>
							</tr>       
						</table><!-- close tablebackground-->
					
					<xsl:if test="$ou:action='pub'" >
					<a id="get-markup" style="position:fixed; top:10px; left:10px; font-size:125%; padding:10px; background-color: #008000;text-align: center;text-decoration: none;color: white;border-radius: 10px;box-shadow: 0 0 4px #999;" href="http://feeds.illinoisstate.edu/services/email-markup.php?url=http://esb.iwss.ilstu.edu/email-final/email-static.php" target="_blank"><xsl:attribute name="href"><xsl:value-of select="concat('http://feeds.illinoisstate.edu/services/email-markup.php?url=',$ou:httproot,substring($ou:dirname,2),'/',$ou:filename)" /></xsl:attribute>Get Markup</a>
					</xsl:if>
					
				</body>
				
			</html>
			
		
		</xsl:template>
		
		<xsl:template name="formatPath">
			<xsl:param name="path" />
			
			<xsl:choose>
				<xsl:when test="starts-with($path,'/')">$_SERVER[DOCUMENT_ROOT]<xsl:value-of select="$path" /></xsl:when>
				<xsl:otherwise><xsl:value-of select="$path" /></xsl:otherwise>
			</xsl:choose>
		</xsl:template>

	

</xsl:stylesheet>

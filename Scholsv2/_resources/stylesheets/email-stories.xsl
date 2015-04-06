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
			<xsl:variable name="feed" select="$email/feed" />
			<xsl:variable name="xsl" select="$email/xsl" />
			<xsl:variable name="transformPath">
				<xsl:call-template name="formatPath"><xsl:with-param name="path" select="$email/transform_path" /></xsl:call-template>
			</xsl:variable>
			<xsl:variable name="stylePath">
				<xsl:call-template name="formatPath"><xsl:with-param name="path" select="$email/style_path" /></xsl:call-template>
			</xsl:variable>
			<xsl:variable name="footerPath">
				<xsl:call-template name="formatPath"><xsl:with-param name="path" select="$email/footer_path" /></xsl:call-template>
			</xsl:variable>
			
			<xsl:variable name="analytics"><xsl:value-of select="concat('?utm_source=',normalize-space($email/analytics/source),'&amp;utm_medium=',normalize-space($email/analytics/medium),'&amp;utm_campaign=',normalize-space($email/analytics/campaign))" /></xsl:variable>
			
			
			<xsl:processing-instruction name="php">$newsletter_link = "<xsl:value-of select="concat($email/newsletter_link,$analytics)" />"; include ("<xsl:value-of select="$transformPath" />"); $feed="<xsl:value-of select="$feed" />"; $xsl="<xsl:value-of select="$xsl" />"; ?</xsl:processing-instruction>
			
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

					<!-- HIDDEN EDITABLE REGION -->
					<!-- Hack to prevent going straight to WYSISYG -->
					<xsl:if test="$ou:action='prv' or $ou:action='edt'" >
						<div style="display:none">
							<xsl:comment> com.omniupdate.div label="hidden_multi_edit" button="hide" group="everyone" </xsl:comment>
							<xsl:comment> com.omniupdate.multiedit type="text" prompt="hidden" </xsl:comment>
							<xsl:comment> /com.omniupdate.div </xsl:comment>
						</div>
					</xsl:if>
					
					<table width="100%" cellpadding="0" cellspacing="0" border="0" id="backgroundTable" bgcolor="#f1f1f1" style="background-color:#f1f1f1">
  <tr>
  	<td>
  	
  	<!--BEGIN TOP ROW-->
  	
  	<table align="center" width="600" class="table-frame" id="tableWrapTop" border="0" cellpadding="0" cellspacing="0" style="height:144px; padding:0; border-collapse:collapse; margin: 0px auto 0px auto; background-color:transparent;">
    	<tr>
    	<!-- LEFT BACKGROUND -->
            <td valign="top" width="40" class="bg-cell" style="height:144px; padding:0; margin:0; background-color:#f1f1f1;">
                <!--left background-->
            </td>
            <td style="height:142px; padding:0; margin:0; background-color:transparent; vertical-align:top;">
            	<!--Inner Content-->
                <table width="520" border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse; margin: 0px auto 0px auto;">
                    <tr>
                        <td align="left" valign="top">
                        <!--iGuide-->
                            <table border="0" cellpadding="0" cellspacing="0" id="iguide" bgcolor="#cc0000" style="background-color:#cc0000; height:48px; width: 100%;">
                                <tr>
                                    <td align="left" width="100%" valign="top" id="university-logo" style="margin:0; padding:0; background-color:#c00;" >
										<a href="{$email/iguide/@link}{$analytics}">
                                            <img style="display:block; boder:none; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;" src="{$email/iguide/@img}" alt="{$email/iguide/@alt}"/>
                                        </a>
                                    </td>
                                    
                                </tr>
                            </table>
                            <!--Header-->
							<table border="0" cellpadding="0" cellspacing="0" id="header" style="border-collapse:collapse; background-color:#6098cb; height:96px; width: 100%;">
                                <tr>
                                     <td align="left" width="328" valign="middle" id="name" style="margin:0; padding:0; height:96px; width:328px;">
										 <a href="{$email/newsletter_link}{$analytics}">
											<img style="margin:0; padding:0; display:block; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; width:100%;" src="{$email/header/@img}" alt="{$email/header/@alt}" width="100%" />
                                    	</a>
                                    </td>
									<td align="right" valign="middle" width="182" style="width:182px; padding-right:10px;" id="issue">
										<p style="text-transform:uppercase; font-size:.8em; font-family: 'ISUCondBold', Verdana, sans-serif; text-align:right; margin:0; color:#fff;  "><xsl:value-of select="$email/banner_label" /></p>
                                    	<p style="font-family: Verdana, Arial, sans-serif; font-size:20px; margin:0; color:#fff;">
											<a style="color:#fff" href="{$email/newsletter_link}{$analytics}"><xsl:value-of select="$email/banner_text" /></a>
                                    	</p>
                                	</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
       <!-- Right BACKGROUND -->
            <td valign="top" width="40" class="bg-cell" style="height:144px; padding:0; margin:0; background-color:#f1f1f1;">
                <!--right background-->
            </td>
        </tr>
    </table>
	<!--END TOP ROW-->
		
        <!-- APPLY ROW TEMPLATES -->
		<xsl:apply-templates/>
		
		
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
		
		<xsl:template match="document/row">
			
			<xsl:variable name="feed" select="//document/email/feed" />
			<xsl:variable name="xsl" select="//document/email/xsl" />
			<xsl:variable name="analytics"><xsl:value-of select="concat('?utm_source=',normalize-space(//document/email/analytics/source),'&amp;utm_medium=',normalize-space(//document/email/analytics/medium),'&amp;utm_campaign=',normalize-space(//document/email/analytics/campaign))" /></xsl:variable>
			
			<xsl:variable name="placeholder">
				<xsl:choose>
					<xsl:when test="type='F'">/_resources/placeholders/email-feature.html</xsl:when>
					<xsl:when test="type='D'">/_resources/placeholders/email-double.html</xsl:when>
					<xsl:otherwise>/_resources/placeholders/email-single.html</xsl:otherwise>
				</xsl:choose>
			</xsl:variable>
			
			<xsl:variable name="template">
				<xsl:choose>
					<xsl:when test="type='F'">feature</xsl:when>
					<xsl:when test="type='D'">double</xsl:when>
					<xsl:otherwise>single</xsl:otherwise>
				</xsl:choose>
			</xsl:variable>
			
			<xsl:variable name="row_feed">
				<xsl:choose>
					<xsl:when test="normalize-space(alt)=''">$feed</xsl:when>
					<xsl:otherwise>"<xsl:value-of select="normalize-space(alt)" />"</xsl:otherwise>
				</xsl:choose>
			</xsl:variable>
			
			<xsl:variable name="row_xsl">
				<xsl:choose>
					<xsl:when test="normalize-space(alt_xsl)=''">$xsl</xsl:when>
					<xsl:otherwise>"<xsl:value-of select="normalize-space(alt_xsl)" />"</xsl:otherwise>
				</xsl:choose>
			</xsl:variable>			
			
			<xsl:comment> ouc:div label="row-<xsl:value-of select="position()" />" button="hide" path="<xsl:value-of select="$placeholder" />" </xsl:comment>
			<xsl:text disable-output-escaping="yes">&lt;?php xslTransform(</xsl:text><xsl:value-of select="$row_xsl" /><xsl:text disable-output-escaping="yes">,</xsl:text><xsl:value-of select="$row_feed" /><xsl:text disable-output-escaping="yes">,array("template"=&gt;"</xsl:text><xsl:value-of select="$template" /><xsl:text disable-output-escaping="yes">","start"=&gt;"</xsl:text><xsl:value-of select="start" /><xsl:text disable-output-escaping="yes">","analytics"=&gt;"</xsl:text><xsl:value-of disable-output-escaping="yes" select="$analytics" /><xsl:text disable-output-escaping="yes">")); ?&gt;</xsl:text>
			<xsl:comment> /ouc:div </xsl:comment>
			
		</xsl:template>
		
		<xsl:template match="document/email" />
		<xsl:template match="document/config" />
		
		<xsl:template name="formatPath">
			<xsl:param name="path" />
			
			<xsl:choose>
				<xsl:when test="starts-with($path,'/')">$_SERVER[DOCUMENT_ROOT]<xsl:value-of select="$path" /></xsl:when>
				<xsl:otherwise><xsl:value-of select="$path" /></xsl:otherwise>
			</xsl:choose>
		</xsl:template>

	

</xsl:stylesheet>

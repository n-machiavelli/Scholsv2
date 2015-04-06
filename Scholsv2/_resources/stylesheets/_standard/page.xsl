<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM "http://cdn.illinoisstate.edu/dtd/ou/standard.dtd">
<xsl:stylesheet version="3.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
    xmlns:ou="http://omniupdate.com/XSL/Variables"
    exclude-result-prefixes="ou">
        	
	<xsl:template match="/">
		<xsl:call-template name="code" />
		<xsl:text disable-output-escaping="yes">&lt;!DOCTYPE html&gt;</xsl:text>
		<xsl:comment><xsl:text disable-output-escaping="yes">[if lt IE 7]&gt; &lt;</xsl:text>html class="no-js ie6 oldie <xsl:value-of select='$html-class' />" lang="en"<xsl:text disable-output-escaping="yes">&gt; &lt;![endif]</xsl:text></xsl:comment>
		<xsl:comment><xsl:text disable-output-escaping="yes">[if IE 7]&gt; &lt;</xsl:text>html class="no-js ie7 oldie <xsl:value-of select='$html-class' />" lang="en"<xsl:text disable-output-escaping="yes">&gt; &lt;![endif]</xsl:text></xsl:comment>
		<xsl:comment><xsl:text disable-output-escaping="yes">[if IE 8]&gt; &lt;</xsl:text>html class="no-js ie8 oldie <xsl:value-of select='$html-class' />" lang="en"<xsl:text disable-output-escaping="yes">&gt; &lt;![endif]</xsl:text></xsl:comment>
		<xsl:comment><xsl:text disable-output-escaping="yes">[if gt IE 8]&gt;&lt;!</xsl:text></xsl:comment> <xsl:text disable-output-escaping="yes">&lt;</xsl:text>html class="no-js <xsl:value-of select='$html-class' />" lang="en"<xsl:text disable-output-escaping="yes">&gt;</xsl:text> <xsl:comment><xsl:text disable-output-escaping="yes">&lt;![endif]</xsl:text></xsl:comment>
		<xsl:call-template name="head" />
		<xsl:call-template name="body" />
		<xsl:text disable-output-escaping="yes">&lt;</xsl:text>/html<xsl:text disable-output-escaping="yes">&gt;</xsl:text>
	</xsl:template>

	<xsl:template name="head">
		<head>		
			<xsl:call-template name="meta" />
			<xsl:call-template name="css" />
			<xsl:call-template name="before_closing_head" />			
		</head>
	</xsl:template>

	<xsl:template name="body">
		<body>
			<div id="container">
				<xsl:comment>googleoff: all</xsl:comment>
				<xsl:call-template name="iguide" />
				<xsl:comment>googleon: all</xsl:comment>
				<xsl:comment>googleoff: snippet</xsl:comment>
				<xsl:call-template name="header" />
				<xsl:call-template name="nav" />
				<xsl:comment>googleon: snippet</xsl:comment>
				<xsl:call-template name="sub_mast" />
				<xsl:call-template name="body_content" />
				<xsl:call-template name="sub_content" />
				<xsl:comment>googleoff: snippet</xsl:comment>
				<xsl:call-template name="footer" />
				<xsl:call-template name="modified" />
				<xsl:comment>googleon: snippet</xsl:comment>
				<xsl:call-template name="before_closing_body" />
			</div>
		</body>
	</xsl:template>

</xsl:stylesheet>

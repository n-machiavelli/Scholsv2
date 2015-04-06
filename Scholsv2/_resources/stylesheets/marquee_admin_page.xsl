<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM "http://cdn.illinoisstate.edu/dtd/ou/standard.dtd">
<xsl:stylesheet version="2.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
    xmlns:ou="http://omniupdate.com/XSL/Variables"
    exclude-result-prefixes="ou">
   
	<xsl:output method="xml" indent="yes" encoding="UTF-8" omit-xml-declaration="yes"  />
	<xsl:strip-space elements="*"/>
    
    <xsl:include href="_standard/common.xsl" />
	<xsl:include href="_standard/code.xsl" />
	<xsl:include href="_standard/meta.xsl" />
	<xsl:include href="_standard/css.xsl" />
	<xsl:include href="_standard/before_closing_head.xsl" />
	<xsl:include href="_standard/iguide.xsl" />
	<xsl:include href="_standard/header.xsl" />
	<xsl:include href="_standard/mast_nav.xsl" />
	<xsl:include href="_standard/nav.xsl" />  
	<xsl:include href="_standard/sub_mast.xsl" />
	<xsl:include href="_standard/section_nav.xsl" /> 
	<xsl:include href="_marquee/render.xsl" /> <!-- Replaced content.xsl -->
	<xsl:include href="_standard/body_content.xsl" />
	<xsl:include href="_standard/layout_common.xsl" />
	<xsl:include href="_standard/layout_basic.xsl" />
	<xsl:include href="_standard/layout_callout.xsl" />
	<xsl:include href="_standard/layout_sidebar.xsl" />
	<xsl:include href="_standard/layout_optionbox.xsl" />
	<xsl:include href="_standard/layout_twocol.xsl" />
	<xsl:include href="_standard/layout_threecol.xsl" />
	<xsl:include href="_standard/layout_custom.xsl" />
	<xsl:include href="_standard/sub_content.xsl" />
	<xsl:include href="_standard/footer.xsl" />
	<xsl:include href="_standard/modified.xsl" />
	<xsl:include href="_standard/before_closing_body.xsl" />
	
	<xsl:include href="variables.xsl" />
	<xsl:include href="_standard/page.xsl" />

</xsl:stylesheet>

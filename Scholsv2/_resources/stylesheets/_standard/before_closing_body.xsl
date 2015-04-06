<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM "http://cdn.illinoisstate.edu/dtd/ou/standard.dtd">
<xsl:stylesheet version="3.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
    xmlns:ou="http://omniupdate.com/XSL/Variables"    
    exclude-result-prefixes="ou">
    
	<xsl:template name="before_closing_body">
				
		<xsl:if test="$page-tools='true'">
			<div id="wrappagetools">
				<xsl:call-template name="render-include">
					<xsl:with-param name="path" select="$page_tools-include" />
					<xsl:with-param name="label" select="'page_tools-include'" />
				</xsl:call-template>
				<xsl:if test="child::text()[normalize-space(document/page-tools)] | child::* != ''">
					<xsl:copy-of select="document/page-tools/node()" />
				</xsl:if>
			</div>
		</xsl:if>
		
		<xsl:if test="$feedback='true'">
			<div id="wrapfeedback">
				<xsl:call-template name="render-include">
					<xsl:with-param name="path" select="$feedback-include" />
					<xsl:with-param name="label" select="'feedback-include'" />
				</xsl:call-template>
				<xsl:if test="child::text()[normalize-space(document/feedback)] | child::* != ''">
					<xsl:copy-of select="document/feedback/node()" />
				</xsl:if>
			</div>
		</xsl:if> 
		
		<xsl:call-template name="render-include">
			<xsl:with-param name="path" select="$body-btm-include" />
			<xsl:with-param name="label" select="'body-btm-include'" />
		</xsl:call-template>
		 
		<xsl:if test="child::text()[normalize-space(document/before-closing-body)] | child::* != ''">
			<xsl:copy-of select="document/before-closing-body/node()" />
		</xsl:if>
		
		<xsl:if test="$ou:action != 'pub'">
			<div id="dev-tools"> 
				<div>
					Links: 
					<a><xsl:attribute name="href"><xsl:value-of select="$ou:httproot" /></xsl:attribute>Site root</a> |
					<a><xsl:attribute name="href"><xsl:value-of select="concat($ou:httproot,substring($ou:path,2))" /></xsl:attribute>Page</a>
				</div>
				<div>Extension: <xsl:value-of select="$extension" /></div>
				<div>Template: <xsl:value-of select="$template" /></div>
				<div>Layout: <xsl:value-of select="normalize-space(concat($page-layout,' ',$intro-layout))" /></div>		
			</div>
		</xsl:if >
	</xsl:template>

</xsl:stylesheet>

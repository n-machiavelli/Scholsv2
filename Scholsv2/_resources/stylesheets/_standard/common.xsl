<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM "http://cdn.illinoisstate.edu/dtd/ou/standard.dtd">
<xsl:stylesheet version="3.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
    xmlns:ou="http://omniupdate.com/XSL/Variables"    
    exclude-result-prefixes="ou">
    	
	<xsl:template name="render-include">
	    <xsl:param name="path" />
	    <xsl:param name="label" /> 
	    
	    <xsl:if test="$path!='exclude'">
		    <xsl:comment> com.omniupdate.div label="<xsl:value-of select="$label" />" path="<xsl:value-of select="$path" />" </xsl:comment>
		    <xsl:choose>
			<xsl:when test="$extension='php'" >
				<xsl:processing-instruction name="php">include ($_SERVER["DOCUMENT_ROOT"]."<xsl:value-of select="$path" />"); </xsl:processing-instruction>
			</xsl:when>
			<xsl:otherwise>
			    <xsl:comment>#include virtual="<xsl:value-of select="$path" />"</xsl:comment>
			</xsl:otherwise>
		    </xsl:choose>
		    <xsl:comment> /com.omniupdate.div </xsl:comment> 
		</xsl:if>
	</xsl:template>

</xsl:stylesheet>

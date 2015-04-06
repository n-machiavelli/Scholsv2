<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM "http://cdn.illinoisstate.edu/dtd/ou/standard.dtd">
<xsl:stylesheet version="3.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
    xmlns:ou="http://omniupdate.com/XSL/Variables"    
    exclude-result-prefixes="ou">
    
	<xsl:template name="render-giving">
		<xsl:param name="label" />
	    <xsl:if test="$giving='true'" >
	    	<div id="wrapgiving">
			<xsl:call-template name="render-include">
				<xsl:with-param name="path" select="$giving-include" />
				<xsl:with-param name="label" select="'giving-include'" />
			</xsl:call-template>
			<xsl:if test="child::text()[normalize-space(document/giving)] | child::* != ''">
				<xsl:copy-of select="document/giving/node()" />
			</xsl:if>
		</div>
	    </xsl:if>
	</xsl:template>
	
	<xsl:template name="render-intro">
	    <xsl:if test="$intro-offset &gt; 0">
                <section class="content1">
                    
                    <span class="section_top"><xsl:comment>Top</xsl:comment></span>
                    <div class="section_mid">
                        <xsl:copy-of select="document/main-content[position()=1]/node()" />
                    </div>
                    <span class="section_btm"><xsl:comment>Bottom</xsl:comment></span>
                </section> 
            </xsl:if>
            <xsl:if test="$intro-offset &gt; 1">
                <section class="content2">
                    
                    <span class="section_top"><xsl:comment>Top</xsl:comment></span>
                    <div class="section_mid">
                        <xsl:copy-of select="document/main-content[position()=2]/node()" />
                    </div>
                    <span class="section_btm"><xsl:comment>Bottom</xsl:comment></span>
                </section> 
            </xsl:if>
	</xsl:template>
	
</xsl:stylesheet>

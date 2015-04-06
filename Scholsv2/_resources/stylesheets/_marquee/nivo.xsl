<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM "http://cdn.illinoisstate.edu/dtd/ou/standard.dtd">
<xsl:stylesheet version="2.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
    xmlns:ou="http://omniupdate.com/XSL/Variables"    
    exclude-result-prefixes="ou">
    
    <xsl:output method="xml" indent="yes" encoding="UTF-8" omit-xml-declaration="yes"  />
	
	<xsl:template name="nivo">
		
		<xsl:variable name="suffix">
			<xsl:choose>
				<xsl:when test="normalize-space(/document/marquee/suffix)!=''">_<xsl:value-of select="normalize-space(/document/marquee/suffix)" /></xsl:when>
				<xsl:otherwise></xsl:otherwise>
			</xsl:choose>
		</xsl:variable>
		
		<xsl:variable name="max" select="//max + 1" />
		
		<xsl:variable name="items">
			<root>
				<xsl:for-each select="//item[display='Y']">
					<xsl:sort select="order" />
					<xsl:copy-of select="." />
				</xsl:for-each>
			</root>
		</xsl:variable>
		
		<div class="slider-wrapper">
			<div class="nivoSlider" aria-hidden="true">
				<xsl:attribute name="id"><xsl:value-of select="normalize-space(concat('slider',$suffix))" /></xsl:attribute>
				
				<xsl:for-each select="$items/root/item[position() &lt; $max]">
					<img>
						<xsl:attribute name="src"><xsl:value-of select="image/img/@src" /></xsl:attribute>
						<xsl:if test="normalize-space(caption)!=''">
							<xsl:attribute name="title">#htmlcaption<xsl:value-of select="normalize-space(concat(position(),$suffix))" /></xsl:attribute>
						</xsl:if>
						<xsl:if test="image/img/@alt!=''">
							<xsl:attribute name="alt"><xsl:value-of select="image/img/@alt" /></xsl:attribute>
						</xsl:if>	
					</img>
				</xsl:for-each>
			</div>
			
			<xsl:for-each select="$items/root/item[position() &lt; $max]">
				<xsl:if test="normalize-space(caption)!=''">
					<xsl:variable name="captionText">
						<xsl:value-of select="replace(caption,'\[(.+?)\]','&lt;$1&gt;')" />
					</xsl:variable>
					<div class="nivo-html-caption visuallyhidden">
						<xsl:attribute name="id">htmlcaption<xsl:value-of select="normalize-space(concat(position(),$suffix))" /></xsl:attribute>
						<xsl:value-of select="$captionText"  disable-output-escaping="yes"  />
					</div>
				</xsl:if>
			</xsl:for-each>
		</div>
		
		<script type="text/javascript">
			jQuery(window).load(function() {
			jQuery('<xsl:value-of select="normalize-space(concat('#slider',$suffix))" />').nivoSlider(<xsl:value-of select="document/marquee/settings" />);
			});
		</script>
		
	</xsl:template>

</xsl:stylesheet>

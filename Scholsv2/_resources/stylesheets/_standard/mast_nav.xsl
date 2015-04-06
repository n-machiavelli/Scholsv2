<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM "http://cdn.illinoisstate.edu/dtd/ou/standard.dtd">
<xsl:stylesheet version="3.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
    xmlns:ou="http://omniupdate.com/XSL/Variables" 
    exclude-result-prefixes="ou">
   
    <xsl:output method="xml" indent="yes" encoding="UTF-8" omit-xml-declaration="yes"  />

	<xsl:template name="mast-nav">
		<span class="mastnav_top"><xsl:comment>MastNav Top</xsl:comment></span> 
		<span class="mastnav_mid">
			<xsl:for-each select="$navigation-xml/container">
				<div class="resp-nav">
					<xsl:variable name="mastlevel">mastlevel<xsl:value-of select="position()" /></xsl:variable>
					
					<ul class="{$mastlevel}">
						<span class="{$mastlevel}_top"><xsl:comment>Top</xsl:comment></span> 
						<xsl:for-each select="nav[not(@hidden='true')]">
							<xsl:call-template name="mast-nav-element">
								<xsl:with-param name="level"><xsl:value-of select="position()" /></xsl:with-param>
							</xsl:call-template>
						</xsl:for-each>
						<span class="{$mastlevel}_btm"><xsl:comment>Bottom</xsl:comment></span> 
					</ul>
				</div>
			</xsl:for-each>
		</span>
		<span class="mastnav_btm"><xsl:comment>MastNav Bottom</xsl:comment></span> 
	</xsl:template>
	
	<xsl:template name="mast-nav-element">
		<xsl:param name="level" />
		
			<xsl:variable name="path-class"><xsl:choose>
				<xsl:when test="
					(@url = $ou:dirname and starts-with($ou:filename,'index.')) or
					(@url = concat($ou:dirname, '/') and starts-with($ou:filename, 'index.')) or
					(substring-before(@url, '.') = substring-before(concat($ou:dirname, '/', $ou:filename), '.'))
				">current</xsl:when>
				<xsl:when test="
					(contains(concat($ou:dirname, '/'), @url))
				">parent</xsl:when>
			</xsl:choose></xsl:variable>
			<xsl:variable name="addclass" select="@addclass" />
			<xsl:variable name="offsite"><xsl:if test="contains(@url, '//')">offsite</xsl:if></xsl:variable>
			
			<li>
				<xsl:attribute name="class"><xsl:value-of select="normalize-space(concat('mastlink', $level, ' ', $path-class, ' ', $addclass))" /></xsl:attribute>
				<span class="mastlink_top"><xsl:comment>Top</xsl:comment></span> 
				<span class="mastlink_mid">
					<a>
						<xsl:attribute name="class"><xsl:value-of select="normalize-space(concat($path-class, ' ', $offsite, ' ', $addclass))" /></xsl:attribute>
						<xsl:if test="normalize-space(@title)!=''">
							<xsl:attribute name="title"><xsl:value-of select="normalize-space(@title)" /></xsl:attribute>
						</xsl:if>
						<xsl:if test="normalize-space(@target)!=''">
							<xsl:attribute name="target"><xsl:value-of select="normalize-space(@target)" /></xsl:attribute>
						</xsl:if>
						<xsl:attribute name="href"><xsl:value-of select="@url" /></xsl:attribute>
						<span><xsl:value-of disable-output-escaping="yes" select="replace(@label,'\[(.+?)\]','&lt;$1&gt;')" /></span>
					</a>
				</span>
				<span class="mastlink_btm"><xsl:comment>Bottom</xsl:comment></span>
			</li> 

	</xsl:template>

</xsl:stylesheet>

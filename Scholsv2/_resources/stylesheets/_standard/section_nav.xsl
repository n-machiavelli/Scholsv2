<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE xsl:stylesheet SYSTEM "http://cdn.illinoisstate.edu/dtd/ou/standard.dtd">
<xsl:stylesheet version="3.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
    xmlns:ou="http://omniupdate.com/XSL/Variables"    
    exclude-result-prefixes="ou">
   
    <xsl:output method="xml" indent="yes" encoding="UTF-8" omit-xml-declaration="yes"  />
    
	<xsl:template name="section-nav">
		
		<span id="sectionnav_top"><xsl:comment>section nav top</xsl:comment></span> 
		<xsl:for-each select="$navigation-xml/container">
			<xsl:for-each select="nav">
				<xsl:call-template name="render_nav">
					<xsl:with-param name="pos"><xsl:value-of select="position()" /></xsl:with-param>
					<xsl:with-param name="last"><xsl:value-of select="last()" /></xsl:with-param>
					<xsl:with-param name="level">1</xsl:with-param>
				</xsl:call-template>
			</xsl:for-each>
			
		</xsl:for-each>
		
		<xsl:value-of select="$navigation-xml/global" disable-output-escaping="yes" />

		<xsl:if test="$sub-section-nav='true'">
			<div id="wrapsubsectionnav">
				<xsl:call-template name="render-include">
					<xsl:with-param name="path" select="$subsectionnav-include" />
					<xsl:with-param name="label" select="'subsectionnav-include'" />
				</xsl:call-template>
				<xsl:if test="child::text()[normalize-space(document/subsectionnav)] | child::* != ''">
					<xsl:copy-of select="document/subsectionnav/node()" />
				</xsl:if>
			</div>
		</xsl:if>

		<span id="sectionnav_btm"><xsl:comment>section nav bottom</xsl:comment></span> 
	</xsl:template>
	
	<xsl:template name="render_nav">
		<xsl:param name="pos">0</xsl:param>
		<xsl:param name="last">0</xsl:param>
		<xsl:param name="level">1</xsl:param>
		<xsl:param name="mast_levels">1</xsl:param>
		
		<xsl:if test="$level &gt; $mast_levels">
			<xsl:variable name="position"><xsl:choose>
				<xsl:when test="$pos = 1">first</xsl:when>
				<xsl:when test="$pos = $last">last</xsl:when>
			</xsl:choose></xsl:variable>
			<xsl:variable name="path-class">
			<xsl:choose>
				<xsl:when test="
					(@url = $ou:dirname and starts-with($ou:filename,'index.')) or
					(@url = concat($ou:dirname, '/') and starts-with($ou:filename, 'index.')) or
					(substring-before(@url, '.') = substring-before(concat($ou:dirname, '/', $ou:filename), '.'))
				">current</xsl:when>
				<xsl:when test="
					(contains(concat($ou:dirname, '/'), @url))
				">parent</xsl:when>
			</xsl:choose>
			</xsl:variable>
			
			<xsl:variable name="offsite"><xsl:if test="contains(@url, '//')">offsite</xsl:if></xsl:variable>
			<xsl:variable name="pdf"><xsl:if test="contains(@url, '.pdf')">pdf-link</xsl:if></xsl:variable>
			<xsl:variable name="level-class">level<xsl:value-of select="$level - $mast_levels" /></xsl:variable>
			<xsl:variable name="addclass"><xsl:value-of select="@addclass" /></xsl:variable>
			<li>
				<xsl:attribute name="class">
					<xsl:value-of select="normalize-space(concat($level-class, ' ', $path-class, ' ', $position, ' ', $addclass))" />
				</xsl:attribute>
				<a>
					<xsl:attribute name="class">
						<xsl:value-of select="normalize-space(concat($level-class, ' ', $path-class, ' ', $position, ' ', $offsite, ' ', $pdf, ' ', $addclass))" />
					</xsl:attribute>
					<xsl:attribute name="href"><xsl:value-of select="@url" /></xsl:attribute>
					<xsl:if test="normalize-space(@title)!=''">
						<xsl:attribute name="title"><xsl:value-of select="normalize-space(@title)" /></xsl:attribute>
					</xsl:if>
					<xsl:if test="normalize-space(@target)!=''">
						<xsl:attribute name="target"><xsl:value-of select="normalize-space(@target)" /></xsl:attribute>
					</xsl:if>
					<span><xsl:value-of disable-output-escaping="yes" select="replace(@label,'\[(.+?)\]','&lt;$1&gt;')" /></span>
				</a>
			</li>
		</xsl:if>
		
		<xsl:if test="count(nav) + count(group) &gt; 0">
			<xsl:if test="
				@url=$ou:dirname or
				@url=concat($ou:dirname, '/') or 
				starts-with($ou:dirname, @url) or
				(
					starts-with(@url, $ou:dirname) and
					not(contains(substring-after(@url, $ou:dirname), '/'))
				)
			">
			
			<xsl:variable name="level-class">level<xsl:value-of select="($level + 1) - $mast_levels" /></xsl:variable>
			<ul>
			
				<xsl:attribute name="class">
					<xsl:value-of select="$level-class" />
				</xsl:attribute>
					
				<xsl:variable name="level-class">level<xsl:value-of select="$level - $mast_levels" /></xsl:variable>
				<xsl:for-each select="nav">
					<xsl:call-template name="render_nav">
						<xsl:with-param name="pos"><xsl:value-of select="position()" /></xsl:with-param>
						<xsl:with-param name="last"><xsl:value-of select="last()" /></xsl:with-param>
						<xsl:with-param name="level"><xsl:value-of select="$level + 1" /></xsl:with-param>
					</xsl:call-template>
				</xsl:for-each>
			</ul>
			</xsl:if>
		</xsl:if>
		
	</xsl:template>

</xsl:stylesheet>

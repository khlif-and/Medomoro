Add-Type -AssemblyName System.Drawing

$sourcePath = "frontend\src\assets\images\logo.png"
$destPath = "build\appicon_black.png"
$iconPath = "build\windows\icon_black.ico"

# Load source image
$sourceImg = [System.Drawing.Image]::FromFile($sourcePath)

# Dimensions (assuming square, using source size or 1024)
$width = 1024
$height = 1024
$padding = 200

# Create new bitmap
$bmp = New-Object System.Drawing.Bitmap $width, $height
$g = [System.Drawing.Graphics]::FromImage($bmp)

# Fill with Black
$rect = New-Object System.Drawing.Rectangle 0, 0, $width, $height
$brush = New-Object System.Drawing.SolidBrush [System.Drawing.Color]::Black
$g.FillRectangle($brush, $rect)

# Draw Logo Centered
# Scale logo to fit inside padding
$logoWidth = $width - ($padding * 2)
$logoHeight = $logoWidth * ($sourceImg.Height / $sourceImg.Width)
$x = $padding
$y = ($height - $logoHeight) / 2

$g.DrawImage($sourceImg, $x, $y, $logoWidth, $logoHeight)

# Save as PNG
$bmp.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)

Write-Host "Created $destPath"

# Cleanup
$g.Dispose()
$bmp.Dispose()
$sourceImg.Dispose()
$brush.Dispose()

$files = Get-ChildItem -Path "public" -File
foreach ($file in $files) {
    $ext = $file.Extension.ToLower()
    $tempFile = "public\temp_$($file.Name)"
    $originalSize = $file.Length / 1MB
    
    if ($ext -eq ".mp4") {
        Write-Output "Compressing Video: $($file.Name) ($([math]::Round($originalSize, 2)) MB)"
        # Compress video: 720p/1080p, crf 28, fast preset
        & ffmpeg -y -v error -i $file.FullName -vcodec libx264 -crf 30 -preset veryfast -vf "scale='min(1920,iw)':-2" -acodec aac $tempFile
        if (Test-Path $tempFile) {
            Move-Item -Path $tempFile -Destination $file.FullName -Force
        }
    }
    elseif ($ext -match "\.(jpg|jpeg|png)" -and $originalSize -gt 0.5) {
        Write-Output "Compressing Image: $($file.Name) ($([math]::Round($originalSize, 2)) MB)"
        # Compress image: max width 1920, quality 5
        & ffmpeg -y -v error -i $file.FullName -vf "scale='min(1920,iw)':-1" -q:v 5 $tempFile
        if (Test-Path $tempFile) {
            Move-Item -Path $tempFile -Destination $file.FullName -Force
        }
    }
}
Write-Output "Compression Complete."

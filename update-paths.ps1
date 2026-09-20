$f = "src/app/signature/page.tsx"
$c = Get-Content $f
$c = $c -replace '/lc-coupe-hq.jpg', '/LEXUS LC500 highres.jpg'
$c = $c -replace '/lx-mountains-hq.jpg', '/LEXUS LX700h overland highres.jpg'
$c | Set-Content $f

$f = "src/app/executive/page.tsx"
$c = Get-Content $f
$c = $c -replace '/es-executive-hq.jpg', '/LEXUS ES 2024 highres.jpg'
$c = $c -replace '/isf-hq.jpg', '/LEXUS ISF highres.jpg'
$c | Set-Content $f

$f = "src/app/overtrail/page.tsx"
$c = Get-Content $f
$c = $c -replace '/gx-series-hq.jpg', '/LEXUS GX highres.jpg'
$c = $c -replace '/lx-mountains-hq.jpg', '/LEXUS LX700h overland highres.jpg'
$c | Set-Content $f

$f = "src/app/touring/page.tsx"
$c = Get-Content $f
$c = $c -replace '/rx-series-hq.jpg', '/LEXUS RX highres.jpg'
$c = $c -replace '/nx-series-hq.jpg', '/LEXUS NX highres.jpg'
$c = $c -replace '/tx-crossover-hq.jpg', '/LEXUS TX highres.jpg'
$c = $c -replace '/ux-crossover-hq.jpg', '/LEXUS UXh highres.jpg'
$c | Set-Content $f

$f = "src/app/vanguard/page.tsx"
$c = Get-Content $f
$c = $c -replace '/rx-series-hq.jpg', '/LEXUS RX 450e highres.jpg'
$c = $c -replace '/nx-series-hq.jpg', '/LEXUS NX highres.jpg'
$c | Set-Content $f

$f = "src/components/ui/lumina-interactive-list.tsx"
$c = Get-Content $f
$c = $c -replace '/lc-coupe-hq.jpg', '/LEXUS LC500 highres.jpg'
$c = $c -replace '/lx-mountains-hq.jpg', '/LEXUS LX700h overland highres.jpg'
$c | Set-Content $f

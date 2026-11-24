$ErrorActionPreference = 'Continue'
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12 -bor [Net.SecurityProtocolType]::Tls13

$dir = "public\store"
New-Item -ItemType Directory -Force -Path $dir | Out-Null

$imgs = [ordered]@{
  "storefront" = "https://lh3.googleusercontent.com/grass-cs/AABkmLdzKuZwJaVMZnBLUc9g1L-lY-NVUn9t6D1T37YefY3QFCTpla25alV3Z5lWPypoV9no5iC2h41jJLmj2D_wLQtStaCZ0if-ls7gCEQ5NFAM6srgafbC_T4pT-u-sfGlX2GVfrNv2tHe-50=w1920-h1440-k-no"
  "store-1"    = "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWlJIEwtwTRb7Bq5QRhuRCK2zTxLPymh21QhvBBEPXGW7LCvxWhVWGDUpLhD-oXQxULdoAjdUeIoIN4UPeHodMesJ84jWB_uuwDPXnaKaZzffSvgnaD5tiQvcn2HnAEfXo5iWk_jUYircLc=w1920-h1440-k-no"
  "store-2"    = "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWkgZm-AhKTve8KNsFFDIZM_OEV3q8ur_pnqw1ViM3PtThv4PpqJFUdfuYdYosuS85QC7W0WKE1VOlwILQGbovCYIqEh3PxUdWUdldEUiMl5iRlaVGJxvWn-_uqEDGret52Rdzdz8xt52CA=w1920-h1440-k-no"
  "store-3"    = "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWmQrnHNj5PP52sQ-s7OPhfncKSuUWMtks71UQ60b1ZnVcgftJ-wgCKCf8Qc4p85WJhxW0DSWtbO-PNDeMVpnXMxJQq31Qgl7oVFDX6hkdCute9QxHWRpkdPcn1l1Bp2X77GgYCB_o2U9u3P=w1920-h1440-k-no"
  "hookah"     = "https://lh3.googleusercontent.com/grass-cs/ACvplmN-cMn1RRSzQtd3gjK_lyAiarWy84FfRGMbCfV_7toQzfmndFXIm2VyNEQN0DKrfMDjE59vKXt764Tbwwt5GiZGeKer7bBpafPWtUSfVcsA88SParTI6VmTTaw4L8UNuzkj9k83HtZqtpdr=w1920-h1440-p-k-no"
  "vape-real"  = "https://lh3.googleusercontent.com/grass-cs/ACvplmPOsbsioiLZW9y8qwWLaWL_mNU12jcyp1gDSz3KYfI9tkj4_v3-W18NvtpYGcb6kBjr3mw_OqQaZlJlCq7VLKd3V3MJmjVX9CB4iCiFy6Jx3eClSYgS9yc0ZrijQS1ERd53Xsdw-5-8cN4=w1920-h1440-p-k-no"
  "product-2"  = "https://lh3.googleusercontent.com/grass-cs/ACvplmOt9e3U7wtT73mljqD8jlQFLq7ttX9l5Tnhqf7tq4xq7T3REZvW-RWcusk9JRajDQ_j9wWMjp0eDHw_d7K6TVYitaS1Qkg1NtNt5ewEqWrOeVZlsqXfhYqWCsKQLagQZPO00GsWzSUgA8s=w1920-h1440-p-k-no"
  "interior-1" = "https://lh3.googleusercontent.com/grass-cs/ACvplmOj8hm5JvNC7qHS_s-KFC6i0XoO56nqN1WGEHvfg6RBxVKlGp_W481Sh_2J8AXGVJ8jRb_43PXo4NMqXQezYw0KF0oa0io852MBlHTClmoqzRqScF1ccTxfTbexk9bgMblk7uexGgOUr3A8=w1440-h1920-p-k-no"
  "interior-2" = "https://lh3.googleusercontent.com/grass-cs/ACvplmOr8aOf9XfgTpwhJe6B9TD1_H2ivUVggJNkBBYf3V4YHBcKnDuJft8anqnSE2ANfAXASt_eWq465j50aeKtu1G0auKyfqnVvv5d_tAX12IhV9C9oCY1QvzJiysoWkvOI80L9tm5dh4kyKI3=w1440-h1920-p-k-no"
}

foreach ($k in $imgs.Keys) {
  $ok = $false
  for ($i = 1; $i -le 5 -and -not $ok; $i++) {
    try {
      Invoke-WebRequest -UseBasicParsing -Uri $imgs[$k] -OutFile "$dir\$k.jpg" -TimeoutSec 40
      $len = (Get-Item "$dir\$k.jpg").Length
      if ($len -gt 5000) { Write-Output "OK $k ($len bytes)"; $ok = $true }
      else { Write-Output "SMALL $k attempt $i ($len)"; Remove-Item "$dir\$k.jpg" -Force }
    } catch {
      Write-Output "RETRY $k attempt $i"
      Start-Sleep -Seconds 2
    }
  }
  if (-not $ok) { Write-Output "FAILED $k" }
}

Write-Output "---- RESULT ----"
Get-ChildItem $dir | Select-Object Name, Length | Format-Table -AutoSize

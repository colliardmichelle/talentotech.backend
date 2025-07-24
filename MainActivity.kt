//ESTO ES PARA KOTLIN 

package com.tulata.webviewfull

import android.annotation.SuppressLint
import android.content.pm.ActivityInfo
import android.os.Bundle
import android.util.DisplayMetrics
import android.webkit.WebChromeClient
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {

    private lateinit var webView: WebView

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Fullscreen
        supportActionBar?.hide()
        window.decorView.systemUiVisibility = (
            android.view.View.SYSTEM_UI_FLAG_FULLSCREEN
            or android.view.View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
            or android.view.View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
        )

        // Lock orientation detection
        requestedOrientation = ActivityInfo.SCREEN_ORIENTATION_SENSOR

        // Create WebView programmatically
        webView = WebView(this)
        setContentView(webView)

        val webSettings: WebSettings = webView.settings
        webSettings.javaScriptEnabled = true
        webSettings.useWideViewPort = true
        webSettings.loadWithOverviewMode = true

        webView.webChromeClient = WebChromeClient()
        webView.webViewClient = WebViewClient()

        // URL que vas a usar (la podés cambiar)
        val url = "https://tusitio.com/juego"

        // Datos del dispositivo
        val metrics = DisplayMetrics()
        windowManager.defaultDisplay.getMetrics(metrics)
        val width = metrics.widthPixels
        val height = metrics.heightPixels
        val orientation = if (width > height) "landscape" else "portrait"
        val os = "Android"

        // Armar string JS con los datos que querés pasar al DOM
        val jsParams = """
            javascript:window.deviceInfo = {
                os: '$os',
                orientation: '$orientation',
                width: $width,
                height: $height
            };
        """.trimIndent()

        webView.loadUrl(url)
        webView.evaluateJavascript(jsParams, null)
    }

    override fun onBackPressed() {
        finishAffinity() // Salir de la app al salir del juego
    }
}

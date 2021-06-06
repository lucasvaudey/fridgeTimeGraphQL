package com.fridgeTime.app

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.ImageView
import android.widget.LinearLayout
import android.widget.TextView
import androidx.core.content.ContentProviderCompat.requireContext
import androidx.lifecycle.lifecycleScope
import com.apollographql.apollo.coroutines.await
import com.fridgetime.serv.MeQuery
import com.fridgetime.serv.RegisterMutation
import kotlinx.coroutines.*
import java.security.AccessController.getContext

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
    }

    fun helloClick(view: View) {
        val scope = CoroutineScope(Dispatchers.IO)
        val randomInt = (1..6).random()
        val drawableRes = when (randomInt) {
            1 -> R.drawable.dice_1
            2 -> R.drawable.dice_2
            3 -> R.drawable.dice_3
            4 -> R.drawable.dice_4
            5 -> R.drawable.dice_5
            else -> R.drawable.dice_6
        }
        val diceImage = findViewById<ImageView>(R.id.dice_image)
        diceImage.setImageResource(drawableRes)
        val dynamicText = TextView(this)
        val apollo = Apollo()
        scope.launch{
                val response = apollo.apolloClient(applicationContext)
                    .mutate(RegisterMutation("kdsfjdsfmxnc", "boboob", "mcnzcnvx@bob.com")).await()
                dynamicText.text = response.data?.register?.user?.username
        }
        val entryPoint = findViewById<LinearLayout>(R.id.entry_point)
        entryPoint.addView(dynamicText)
    }

    fun isThisMe(view: View) {
        val scope = CoroutineScope(Dispatchers.IO)
        val dynamicText = TextView(this)
        val apollo = Apollo()
        scope.launch {
            withContext(Dispatchers.IO){
                val response =
                    apollo.apolloClient(applicationContext).query(MeQuery()).await()
                dynamicText.text = response.data?.me?.email
            }
        }
        val entryPoint = findViewById<LinearLayout>(R.id.entry_point)
        entryPoint.addView(dynamicText)
    }
}
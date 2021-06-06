package com.fridgeTime.app

import android.content.Context
import android.content.SharedPreferences
import android.util.Log
import com.apollographql.apollo.ApolloClient
import okhttp3.Interceptor
import okhttp3.OkHttpClient
import okhttp3.Response
import kotlin.coroutines.CoroutineContext

class Apollo {
    init {
        Log.d("init", "apollo init")
    }

    fun apolloClient(context: Context): ApolloClient {
        val apolloClient = ApolloClient.builder()
            .serverUrl("http://192.168.1.67:4000/graphql")
            .okHttpClient(OkHttpClient
                .Builder()
                .addInterceptor(
                    AuthorizationInterceptor(context)
                )
                .addInterceptor(
                    Interceptor { chain ->
                        val response = chain.proceed(chain.request())
                        val cookie = response.header("Set-Cookie")
                        if (cookie != null) {
                            val sharedPrefs: SharedPreferences =
                                context.getSharedPreferences("PrefName", Context.MODE_PRIVATE)
                            sharedPrefs.edit().putString("qid", cookie).apply()
                        }
                        Log.d("response", "${response} cookie : ${cookie}")
                        response
                    }
                )
                .build()
            )
            .build()
        return apolloClient
    }

    private class AuthorizationInterceptor(val context: Context) : Interceptor {
        val sharedPrefs: SharedPreferences =
            context.getSharedPreferences("PrefName", Context.MODE_PRIVATE)

        override fun intercept(chain: Interceptor.Chain): Response {
            Log.d("cookie set :", sharedPrefs.getString("qid", "no cookie set") ?: "no cookie set")
            val request = chain.request().newBuilder()
                .addHeader("Cookie", sharedPrefs.getString("qid", "") ?: "").build()
            return chain.proceed(request)
        }
    }
}
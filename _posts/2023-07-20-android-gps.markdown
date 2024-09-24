---
layout: post
title:  "Android GPS 怎么用"
date:   2023-07-20 15:53:26 +0000
categories: android
---
最近给车写了个速度仪表程序，需要用到GPS，所以在这里记录一下Android中的GPS使用方式。



第一步要在 AndroidManifest.xml 里面加入这行：

    <pre><code>&lt;uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" /&gt;</code></pre>

来申请访问位置的权限。



第二步，在MainActivity里定义并初始化 LocationManager 和 locationProvider。比如：



<pre><code>LocationManager locationManager = (LocationManager) getSystemService(Context.LOCATION_SERVICE);</code></pre>



LocationManager的主要作用是初始化GPS服务，方便后面用GPS。

locationProvider是一个string变量，储存的定位方式（网络，基站，GPS）。初始化方法如下：



String locationProvider = locationManager.GPS_PROVIDER;



我这里图方便直接用GPS，毕竟这个最准。



第三步，获取定位。这一步其实很简单，需要声明一个Location变量，然后让locationManager不停的请求新位置。

（这个必须要先申请权限，要不然没办法运行）



初始化Location变量，先获取一下最后已经知道的位置：



<pre><code>Location location = locationManager.getLastKnownLocation(locationProvider);</code></pre>



再让locationManager不停请求新位置，用的是这个方法：requestLocationUpdates()



比如：



<pre><code>

locationManager.requestLocationUpdates(locationProvider, 100, 1, new LocationListener() {

                @Override

                public void onLocationChanged(@NonNull Location location) {

                    Log.i("Latitude", location.getLatitude());

	    Log.i("Longitude", location.getLongitude());

	    Log.i("Speed", location.getSpeed());

                }



                @Override

                public void onStatusChanged(String provider, int status, Bundle extras) {

                    

                }



                @Override

                public void onProviderEnabled(String provider) {



                }



                @Override

                public void onProviderDisabled(String provider) {

                    

                }

            });

</code></pre>



上面的两个数字，左边的是请求的间隔时间（毫秒），右边的是请求的间隔距离（米）。我这里测了很多次是这俩数字最有效果。



剩下的这几个override的方法在这里讲一下：



onLocationChanged() - 当位置发生变化，就是记录新位置的地方。

onStatusChanged() - 当状态发生变化，通常是当locationProvider找到/丢失/改变的时候。

onProviderEnabled() - 当Provider打开，就可以开始记录位置了。

onProviderDisabled() - 当Provider关闭。



最后在这里说一下上面代码中几个Log信息的含义。

第一个是获取latitude，第二个longitude，第三个速度。

用的方法分别是 location.getLatitude(), location.getLongitude() 和 location.getSpeed()。

这里的speed返回的是m/s的值，想要km/s的还需要转换一下。






---
layout: post
title:  "ListView 怎么用"
date:   2024-09-18 15:53:26 +0000
categories: android
---
最近在做车子的速度仪表，有个环节要用到ListView，正好写写怎么用这个。ListView这个东西用自带的ArrayAdapter挺简单的，可惜没有什么自定义功能，不过这也够我用。第一步，在layout里声明一下ListView：



<pre><code>

&lt;ListView

        android:id="@+id/lv"

        android:layout_width="match_parent"

        android:layout_height="match_parent"

        /&gt;</code></pre>



第二步，声明并初始化ListView和ArrayAdapter的变量：



<pre><code>

Listview lv = findViewById(R.id.lv);

ArrayAdapter av = new ArrayAdapter(this, android.R.layout.simple_list_item_1, data);

lv.setAdapter(av);

</code></pre>

这里的这个data是指的填充ListView的数据。到这里就有一个能正常显示内容的ListView了。ListView每行显示的内容其实都是能点击的，想要实现点击功能很简单，加一个监听器就行：



<pre><code>

private AdapterView.OnItemClickListener onItemClickListener = (adapterView, view, i, l) -> {

        //点击后的动作

    };

</code></pre>

上面这段代码里比较有用的就是这个i变量，储存了用户点击的位置。注：这段代码是放在activity里的，声明监听器的方式也不只这一种。最后，把监听器和ListView连接起来：



<pre><code>

lv.setOnItemClickListener(onItemClickListener);

</code></pre>












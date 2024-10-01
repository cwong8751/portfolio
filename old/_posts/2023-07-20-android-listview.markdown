---
layout: post
title:  "Android ListView 实现多选"
date:   2023-07-20 08:01:26 +0000
categories: android listview
---

这也是一个之前一直想实现但又不知道怎么做的功能，这几天终于琢磨出来了，写在这里记录一下。ListView想要实现多选，需要设定一个ChoiceMode和多选的监听器。ChoiceMode是指的用户可以对ListView进行几重选择（单选，多选）。多选的ChoiceMode是这样写的：<code>lv.setChoiceMode(AbsListView.CHOICE_MODE_MULTIPLE_MODAL);</code> 注：使用AbsListView需要提前引入 <code>android.widget.AbsListView</code>改变ListView的同时，array adapter中的layout也最好改成这个，这样用户知道你选了啥：

<code>

android.R.layout.simple_list_item_multiple_choice

</code>实现多选监听器的方式也很简单：



<code>
rideListView.setMultiChoiceModeListener(new AbsListView.MultiChoiceModeListener() {
    @Override
    public void onItemCheckedStateChanged(ActionMode actionMode, int i, long l, boolean b) {}
    @Override
    public boolean onCreateActionMode(ActionMode actionMode, Menu menu) {
        MenuInflater menuInflater = getMenuInflater();
        menuInflater.inflate(R.menu, menu);
        return true;
    }
    @Override
    public boolean onPrepareActionMode(ActionMode actionMode, Menu menu) {
        return false;
    }
    @Override
    public boolean onActionItemClicked(ActionMode actionMode, MenuItem menuItem) {
        switch (menuItem.getItemId()) {
            //...
        }
        return false;
    }
    @Override
    public void onDestroyActionMode(ActionMode actionMode) {}
});

</code>

IDE会自动带入上面的几个方法，需要注意的是onCreateActionMode和onActionItemClicked。onCreateActionMode方法里面inflate了一个多选之后出现的菜单，这是必须的，要不然多选之后不会有操作菜单出现。其中R.menu是放在menu文件夹下的menu的文件名。onActionItemClicked方法里面检测menu中选项点击之后的操作。至此，ListView就能做到多选了。




<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>posts</title>
    <link rel="stylesheet" href="index.css">
    <link rel="stylesheet" href="index.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100..900;1,100..900&display=swap"
        rel="stylesheet">
</head>

<body>
    <main>
        <div class="container">
            <h2>random ass thoughts</h2>
       <div class="grid-container">
        <?php
        $dir = './posts';
        if (is_dir($dir)) {
            if ($dh = opendir($dir)) {
                while (($file = readdir($dh)) !== false) {
                    if ($file != '.' && $file != '..') {
                        echo '<a href="' . $dir . '/' . $file . '">' . $file . '</a><br>';
                    }
                }
                closedir($dh);
            }
            else{
                echo 'oof, something went wrong.';
            }
        }
        ?>
       </div>
        <a href="./index.html"><button>go back</button></a>
        </div>
    </main>
</body>

</html>
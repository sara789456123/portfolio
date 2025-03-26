<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $score = $_POST['score'];
    file_put_contents('score.txt', $score);
    echo 'Score sauvegarder!';
} else {
    echo 'Invalid request method.';
}
?>

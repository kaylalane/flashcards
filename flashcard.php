<?php
$subject = $question = $answer = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $subject = test_input($_POST["subject"]);

  if(empty($_POST["question"])) {
    $subjectErr = "Subject is required";
  } else {
    $question = test_input($_POST["question"]);
  }
  
  if (empty($_POST["answer"])) {
    $answerErr = "Answer is required";
  }
  $answer = test_input($_POST["answer"]);
}

function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}
?>
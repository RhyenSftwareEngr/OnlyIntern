<?php
function generateTable() {
    require("database_inc.php");
    require_once("functions_inc.php");

    echo "<table>";
    $studLog = getLog($conn ,$_SESSION["userID"]);
    
    $firstDay = getDayOfDate(1, 11,date("Y")-1);
    // debug_to_console(json_encode($studLog));
    function getDayOfMonth($month) {
        return cal_days_in_month(CAL_GREGORIAN, $month, date("Y"));
    }

    // echo $firstDay;
    $totalDays = getTotalDaysInYear(date("Y"));
    $dayCounter = 0;
    $row = 0;
    $column = -1;
    $data = array();
    $startDate = new DateTime(date('Y-01-01'));
    while ($dayCounter < $totalDays) {
        if ($row%8 == 0) {
            $column++;
            $data[$row%8][$column] = array("", "");
        } else {
            if ($column == 0) {
                if ($row%8 == 2) {
                    $data[$row%8][$column] = array("Mon", "");
                } elseif ($row%8 == 4) {
                    $data[$row%8][$column] = array("Wed", "");
                } elseif ($row%8 == 6) {
                    $data[$row%8][$column] = array("Fri", "");
                } else {
                    $data[$row%8][$column] = array("", "");
                }
            } elseif ($column == 1 && $row%8 < $firstDay+1) {
                $data[$row%8][$column] = array("", "");
            } else {
                if ($dayCounter < $totalDays) {
                    $worked = false;
                    foreach ($studLog as $log) {
                        if ($log["date"] == $startDate->format('Y-m-d')) {
                            // debug_to_console($log["date"] . "=" . $startDate->format('Y-m-d'));
                            $data[$row%8][$column] = array($log["verified"], $startDate->format('Y-m-d'));
                            $worked = true;
                        }
                    }
                    if ($worked == false) {
                        $data[$row%8][$column] = array(" ", "");
                    }
                    
                    $dayCounter++;
                    $startDate = $startDate->modify("+1 days");
                } else {
                    $data[$row%8][$column] = array("", "");
                }
            }
        }
        $row++;
    };
    

    for ($i = 0; $i < count($data); $i++) {
        echo '<tr>';
        $colN = count($data[$i]);
        $curr_month = 1;
        $dayOverflow = $firstDay;
        for ($j = 0; $j < $colN; $j++) {
            if ($i == 0) {
                if ($j == 0) {
                    echo '<th></th>';
                }
                else {
                    $weekN = (getDayOfMonth($curr_month)+$dayOverflow)/7;
                    echo '<th colspan='.($weekN).'.>' . date('M', mktime(0, 0, 0, $curr_month, 1)) . '</th>';
                    
                    $dayOverflow = (getDayOfMonth($curr_month) + $dayOverflow)%7;

                    if ($curr_month < 12) {
                        $curr_month++;
                    }
                    $colN = $colN-$weekN+1;
                }
            } else {
                $value = $data[$i][$j][0];
                $date = $data[$i][$j][1];
                debug_to_console($date." ===".$value);
                if ($j == 0) {
                    echo '<th>' . $value . '</th>';
                } else {

                    if ($value >= 8) {
                        $class = 'complete';
                    } elseif ($value > 0) {
                        $class = 'incomplete';
                    } else {
                        $class = 'missing';
                    }

                    if ($value != "") {
                        if ($class == "missing") {
                            echo '<td class="date '. $class . '"></td>';
                        } else {
                            echo '<td class="date '. $class . '" title="'.$date.' '.$value.' hours"></td>';
                        }
                    } else {
                        echo '<td class="date '. $class . '"></td>';
                    }
                }
            }
        }
        echo '</tr>';
    }
    echo "</table>";
}
?>
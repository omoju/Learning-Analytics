# Author - Omoju Miller
# Get all the students we have
# Get the first day of their first term
# Delete all the empty rows

sql = "SELECT us.id, ui.full_name, up.enrolled_at, up.withdrew_at
FROM User_Information AS ui
JOIN users AS us ON us.id = ui.user_id
JOIN user_Programs AS up ON ui.id = up.user_information_id
WHERE up.enrolled_at IS NOT NULL
ORDER BY up.enrolled_at"

record = ActiveRecord::Base.connection.execute(sql)


# -------------- M A I N -------------


$current_date = Time.now()
$enrolled_date

$withdrawal_date
$Withdrawal_Relative_Day_Since_Start_Of_Term
$Withdrawal_Dynamic
$Withdrawal_Static

$Not_Withdrawn_Dynamic = 0
$Not_Withdrawn_Static =0

$Start_Date_Of_First_Term
$info
$denom =0
$dynamicN = 0
$staticN = 0


$New_Platform = Time.new(2012, "mar", 12)
$Days_Since_New_Platform = ($current_date.to_date() - $New_Platform.to_date()).to_i
$Days_Since_Start = 0
$Days_Since_Start_Of_Term


$info = "Days since start".center(20)  + "," + "Withdrawals dynamic".center(20) + "," + "Enrollments in the ".center(20) +  "," + "% not withdrawn dynamic".center(20) + "\n"

for $Days_Since_Start in 0..$Days_Since_New_Platform-1
  record.each do |data|
    $Start_Date_Of_First_Term = data["enrolled_at"]

    # Withdrawal Relative Day Since Start of Term
    if data["withdrew_at"] == nil
      $Withdrawal_Relative_Day_Since_Start_Of_Term =0
    else
      $Withdrawal_Relative_Day_Since_Start_Of_Term = (data["withdrew_at"].to_date - data["enrolled_at"].to_date()).to_i
    end

    # Days since Start of Term
    if data["enrolled_at"] == nil
      $Days_Since_Start_Of_Term = 0
    else
      $Days_Since_Start_Of_Term = ($current_date.to_date() - data["enrolled_at"].to_date()).to_i
    end

    if ($Days_Since_Start_Of_Term > $Days_Since_Start) and ($Days_Since_Start_Of_Term <= $Days_Since_New_Platform) and ($Withdrawal_Relative_Day_Since_Start_Of_Term >=0)
      $denom += 1
    end

    if ($Withdrawal_Relative_Day_Since_Start_Of_Term > 0) and ($Withdrawal_Relative_Day_Since_Start_Of_Term <$Days_Since_Start) and ($Days_Since_Start_Of_Term > $Days_Since_Start) and ($Days_Since_Start_Of_Term <= $Days_Since_New_Platform)
      $dynamicN +=1
    end

  end

  $Not_Withdrawn_Dynamic = ((($denom.to_f - $dynamicN.to_f) / $denom.to_f ).round(2) ) * 100


  $info +=  $Days_Since_Start.to_s.center(20) + ","+ $Not_Withdrawn_Dynamic.to_s.center(20) + "," + $denom.to_s.center(20)  +"," + $dynamicN.to_s.center(20)  + "\n"

  $denom =0
  $dynamicN =0
end



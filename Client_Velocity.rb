=begin
---------------------CLIENT - VELOCITY -----------------------------
Purpose:
Calculate the velocity at which a client goes through our programs.
The velocity is defined as the completions per user per month, where completions are successful completions.
completion: Finish the course successfully which means got competency level which is based on the university

=end

# Check to see if it include withdrawals

def courses_taken_term(user_info_id, term_id, print_flag)
  num_course_completed = 0
  UserInformation.find(user_info_id).course_registrations.where(:term_id=>term_id).each do |classes|
    if classes.status == "passed"
      num_course_completed += 1
      #classes.status == "finished" || classes.status == "completed" ||
    end
  end


   print_flag << UserInformation.find(user_info_id).full_name.gsub( /\,/, "") << " , "
   print_flag << UserInformation.find(user_info_id).user_id << " , "
   print_flag << num_course_completed << "\n"


  return num_course_completed
end

def student_per_term(term_id, print_flag)
  $avg_completion = 0
  if  Term.find(term_id).user_information_terms.count == 0 or Term.find(term_id).end_date > Time.now or Term.find(term_id).start.year < 2012


  else

    Term.find(term_id).user_information_terms.each do |student|
      print_flag << term_id <<  " , "
      print_flag << Term.find(term_id).start.to_date() << " , "
      print_flag << Term.find(term_id).end_date.to_date() << " , "

      # validate the existence of records before proceeding
      begin
        if !UserInformation.exists?(student.user_information_id)
          raise "This record does not exist"
        else
          $avg_completion += courses_taken_term(UserInformation.find(student.user_information_id), term_id, print_flag)
        end
      rescue
        $avg_completion = $avg_completion
      end
    end
    $avg_completion = $avg_completion / Term.find(term_id).user_information_terms.count
    print "The Average completion rate for NCU term ", term_id, " starting ", Term.find(term_id).start.to_date()
    print " and ending ", Term.find(term_id).end_date.to_date(), " is ", $avg_completion, "\n"
  end
end

# -------------- M A I N -------------


output = File.open("/course_velocity.csv", "w")
#output = STDOUT
output << "Term" << " , "
output << "Term Start" << " , "
output << "Term End" << " , "
output << "Name" << " , "
output << "UserID"  << " , "
output << "Courses Passed in Term"  << "\n"




Term.find_each do |t|
  student_per_term(t.id, output)
end

output.close
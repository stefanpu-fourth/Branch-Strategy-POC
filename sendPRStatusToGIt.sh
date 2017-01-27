if [[ $1 == "success" ]]
then
  export STATUS="success"
else
  export STATUS="failure"
fi

curl  "https://github.com/fourth/ess-ui/pull/$2" \
  -H "Content-Type: application/json" \
  -X POST \
  -d "{\"state\": \"$STATUS\", \"description\": \"Jenkins Test \" + \"$2\" + \" $STATUS\" }"

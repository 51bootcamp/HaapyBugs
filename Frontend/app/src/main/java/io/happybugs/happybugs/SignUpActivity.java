package io.happybugs.happybugs;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;

public class SignUpActivity extends AppCompatActivity {

    EditText et_reg_id, et_reg_pw, et_reg_pwcheck;
    String sID, sPW, sPW_check;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sign_up);

        et_reg_id = (EditText) findViewById(R.id.et_reg_email);
        et_reg_pw = (EditText) findViewById(R.id.et_reg_pw);
        et_reg_pwcheck = (EditText) findViewById(R.id.et_reg_pwcheck);

        Intent intent = getIntent();

    }

    private void RegisterUser(String email, String password){

    }

    public void button_signup(View view){
        sID = et_reg_id.getText().toString();
        sPW = et_reg_pw.getText().toString();
        sPW_check = et_reg_pwcheck.getText().toString();

        if(sPW.equals(sPW_check)){
            /* SUCCESSFUL PASSWORD CHECK */
        }
        else{
            /* INVALID PASSWORD */
        }
    }

}

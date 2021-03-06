package io.happybugs.happybugs.activity;

import android.content.Context;
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Patterns;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import org.json.simple.JSONObject;

import io.happybugs.happybugs.APIInterface.APIInterface;
import io.happybugs.happybugs.R;
import io.happybugs.happybugs.network.RetrofitInstance;
import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;

public class SignUpActivity extends AppCompatActivity {

    private Context currContext;
    private EditText etRegEmail;
    private EditText etRegPW;
    private EditText etRegPWCheck;
    private String userEmail;
    private String userPW;
    private String userPWCheck;
    private Button btnStartSignUp;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sign_up);

        currContext = this;
        etRegEmail = (EditText) findViewById(R.id.editText_reg_email);
        etRegPW = (EditText) findViewById(R.id.editText_reg_pw);
        etRegPWCheck = (EditText) findViewById(R.id.editText_reg_pw_check);
        btnStartSignUp = (Button) findViewById(R.id.button_signup);

        btnStartSignUp.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startSignUp();
            }
        });
    }

    private void startSignUp() {
        if (!isValidSignUpForm()) {
            Toast.makeText(getBaseContext(), "SignUp Failed", Toast.LENGTH_LONG).show();
            return;
        }
        sendUserInfo();
    }

    private boolean isValidSignUpForm() {
        boolean isValid = true;
        final int USER_PW_LENGTH_MIN = 8;
        userEmail = etRegEmail.getText().toString();
        userPW = etRegPW.getText().toString();
        userPWCheck = etRegPWCheck.getText().toString();

        if (userEmail.isEmpty() || !Patterns.EMAIL_ADDRESS.matcher(userEmail).matches()) {
            etRegEmail.setError("Enter valid email address");
            isValid = false;
        } else {
            etRegEmail.setError(null);
        }

        if (userPW.isEmpty() || userPW.length() < USER_PW_LENGTH_MIN) {
            etRegPW.setError("Password must be longer than 8");
            isValid = false;
        } else {
            etRegPW.setError(null);
        }

        if (!userPWCheck.equals(userPW)) {
            /* INVALID PASSWORD */
            etRegPWCheck.setError("Passwords must match");
            isValid = false;
        } else {
            /* SUCCESSFUL PASSWORD CHECK */
            etRegPWCheck.setError(null);
        }
        return isValid;
    }

    private void sendUserInfo() {
        userEmail = etRegEmail.getText().toString();
        userPW = etRegPW.getText().toString();

        Retrofit rfInstance = new RetrofitInstance().getInstance(currContext);
        APIInterface service = rfInstance.create(APIInterface.class);

        JSONObject userData = new JSONObject();
        userData.put("email", userEmail);
        userData.put("password", userPW);

        Call<ResponseBody> requestSignUp = service.signup(userData);
        requestSignUp.enqueue(new Callback<ResponseBody>() {
            @Override
            public void onResponse(Call<ResponseBody> call, Response<ResponseBody> response) {
                if (response.code() == 201) {
                    startActivity(new Intent(currContext, SignInActivity.class));
                    Toast.makeText(getBaseContext(), R.string.text_email_auth, Toast.LENGTH_LONG).show();
                    finish();
                } else if (response.code() == 409) {
                    Toast.makeText(getBaseContext(), "That email is taken. Try another.", Toast.LENGTH_LONG).show();
                } else if (response.code() == 400) {
                    Toast.makeText(getBaseContext(), "Password should be longer than 8.", Toast.LENGTH_LONG).show();
                }
            }

            @Override
            public void onFailure(Call<ResponseBody> call, Throwable t) {
                Toast.makeText(getBaseContext(), "Sign-Up failed due to network error", Toast.LENGTH_LONG).show();
            }
        });
    }
}
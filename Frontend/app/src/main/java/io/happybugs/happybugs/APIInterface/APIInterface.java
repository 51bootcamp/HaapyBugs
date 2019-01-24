package io.happybugs.happybugs.APIInterface;

import org.json.simple.JSONObject;

import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.POST;

public interface APIInterface {
    // Create report
    @POST("api/v1/report/create")
    Call<ResponseBody> createReport(@Body JSONObject reportData);
}

package com.hart.cosettle.hearbeat;

import com.hart.cosettle.hearbeat.response.GetHeartBeatResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/heartbeat")
public class HeartBeatController {

    @GetMapping
    public ResponseEntity<GetHeartBeatResponse> getHeartBeat() {
        return ResponseEntity.status(HttpStatus.OK).body(
                new GetHeartBeatResponse("success"));
    }

}

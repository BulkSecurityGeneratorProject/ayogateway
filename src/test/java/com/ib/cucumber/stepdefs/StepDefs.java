package com.ib.cucumber.stepdefs;

import com.ib.AyogatewayApp;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.boot.test.context.SpringBootTest;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = AyogatewayApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}

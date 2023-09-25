package com.cringeneers.rlthack;

import java.util.List;

public class ApiResponse<T> {
    private List<T> results;

    public ApiResponse(List<T> results) {
        this.results = results;
    }

    public List<T> getResults() {
        return results;
    }

    public void setResults(List<T> results) {
        this.results = results;
    }
}
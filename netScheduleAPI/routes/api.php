<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\NetSchedule;
use App\Models\IEX;


Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
/*Route::get('/schedules', function() {
    // If the Content-Type and Accept headers are set to 'application/json', 
    // this will return a JSON structure. This will be cleaned up later.
    return NetSchedule::all();
});*/
Route::get('/schedules/{date}', function($date){
    return NetSchedule::where(
        'date', '=',
        new DateTime($date)
    )->get();
});

Route::post('iex/{date}', function(Request $request, $date) {
    //Log::info($request);
    //Log::info($request->input);
    return IEX::where('date', '=',
    new DateTime($date))->whereIn('region',$request->data)->get();
    
});
/*Route::get('iex/{date}', function($date) {
    return IEX::where('date', '=',
    new DateTime($date))->whereIn('region',["A1","A2"])->get();
    
});*/


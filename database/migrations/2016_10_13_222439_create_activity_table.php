<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateActivityTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('activity', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedSmallInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users');
            $table->unsignedSmallInteger('activity_id');
            $table->foreign('activity_id')->references('id')->on('activity');
            $table->unsignedSmallInteger('route_id');
            $table->foreign('route_id')->references('id')->on('route');
            $table->date('activity_date');
            $table->unsignedSmallInteger('seconds');
            $table->unsignedSmallInteger('metres');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('activity');
    }
}

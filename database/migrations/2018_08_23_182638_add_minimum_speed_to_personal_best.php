<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddMinimumSpeedToPersonalBest extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('personal_bests', function (Blueprint $table) {
            $table->unsignedSmallInteger('minimum_speed')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('personal_bests', function (Blueprint $table) {
            $table->dropColumn('minimum_speed');
        });
    }
}

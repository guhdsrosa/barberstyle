import React, { useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';

const CalendarModal = (props) => {
    LocaleConfig.locales['br'] = {
        monthNames: [
            'Janeiro',
            'Fevereiro',
            'Março',
            'Abril',
            'Maio',
            'Junho',
            'Julho',
            'Agosto',
            'Setembro',
            'Outubro',
            'Novembro',
            'Dezembro'
        ],
        monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set.', 'Out', 'Nov', 'Dez'],
        dayNames: ['Domingo', 'Sábado', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'],
        dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
        today: "Hoje"
    };

    LocaleConfig.defaultLocale = 'br';

    return (
        <View style={{ marginBottom: 10, marginHorizontal: 10 }}>
            <Calendar
                onDayPress={day => {
                    props.setCalendar(day.dateString);
                }}
                markedDates={{
                    [props.date]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' }
                }}
                style={{
                    borderWidth: 1,
                    borderColor: '#000',
                    height: 320,
                    borderRadius: 20,
                    marginTop: 5
                }}
                theme={{
                    backgroundColor: '#181818',
                    calendarBackground: '#181818',
                    textSectionTitleColor: '#fff',
                    selectedDayBackgroundColor: '#14fff4',
                    selectedDayTextColor: '#000',
                    todayTextColor: '#0ebdb5',
                    dayTextColor: '#fff',
                    textDisabledColor: '#6a6a6a',
                    monthTextColor: '#14fff4',
                    arrowColor: '#14fff4'
                }}
            />
        </View>
    )
}

export default CalendarModal
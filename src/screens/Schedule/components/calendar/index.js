import React, { useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';

const CalendarModal = () => {
    const [selected, setSelected] = useState('');
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
        dayNamesShort: ['Dom', 'Sab', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex'],
        today: "Hoje"
    };

    LocaleConfig.defaultLocale = 'br';

    return (
        <View style={{ marginBottom: 30, marginHorizontal: 10 }}>
            <Calendar
                onDayPress={day => {
                    setSelected(day.dateString);
                }}
                markedDates={{
                    [selected]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' }
                }}
                style={{
                    borderWidth: 1,
                    borderColor: '#000',
                    height: 350,
                    borderRadius: 20,
                    marginTop: 15
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
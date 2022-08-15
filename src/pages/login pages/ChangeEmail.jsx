import React from 'react';

const ChangeEmail = () => {
    return (
        <div className='page-body'>
            <div className="reset">
	            <form id="user-registration" method="post" class="form-validate">
					<p>Введите, пожалуйста, адрес электронной почты, указанный в параметрах вашей учётной записи. На этот адрес будет отправлено письмо, содержащее ваш Логин.</p>
					<div class="control-group">
					    <div class="control-label">
						    <label id="jform_email-lbl" for="jform_email" className="required" title="<strong>Адрес электронной почты</strong><br />Введите, пожалуйста, адрес электронной почты, указанный в параметрах вашей учётной записи.<br />На этот адрес будет отправлен специальный проверочный код. После его получения вы сможете ввести новый пароль для вашей учётной записи.">
	                            Адрес электронной почты<span class="star">&nbsp;*</span></label>					
                        </div>
					    <div class="controls">
						    <input type="text" id="jform_email" value="" className="validate-username" size="30" required="required" aria-required="true" />						
                            <button type="submit" className="validate-button">Отправить</button>
					    </div>
				    </div>
																
                </form>
            </div>
        </div>
    );
};

export default ChangeEmail